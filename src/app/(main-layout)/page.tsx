'use client';

import 'swiper/css';

import { useRef, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { ChevronLeft, Search } from 'lucide-react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import TextInput from '@/components/ui/form/text-input';
import TAGS from '@/constant/tags';
import getProducts from '@/lib/react-query/service/products/getProducts';
import { ProductType } from '@/lib/react-query/service/products/product.type';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addOrder, getOrders } from '@/lib/redux/slice/order';

import OrderDetails from './_components/OrderDetails';
import ProductCard from './_components/ProductCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const [slide, setSlide] = useState(0);
  const swiperRef = useRef<SwiperCore>();

  const orders = useAppSelector(getOrders);

  const { data } = useQuery<ProductType[]>({
    queryKey: [TAGS.PRODUCT],
    queryFn: getProducts,
  });

  return (
    <main className="flex h-full w-full gap-8">
      <div className="flex h-full w-full flex-col justify-stretch">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h4">Products</Typography>
          <div className="flex gap-2">
            <IconButton onClick={() => swiperRef.current?.slidePrev()}>
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={() => swiperRef.current?.slideNext()}>
              <ChevronLeft className="rotate-180" />
            </IconButton>
          </div>
        </div>

        {/* <TextInput
          name="search"
          fullWidth
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="mb-6"
        /> */}

        <Swiper
          className="size-full"
          spaceBetween={50}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setSlide(swiper.activeIndex)}
        >
          {_.chunk(data, 12).map((chunk, i) => (
            <SwiperSlide className="!grid !w-full grid-cols-5 gap-4 !overflow-visible" key={i}>
              {chunk.map((product, j) => (
                <ProductCard
                  product={product}
                  onClick={() => dispatch(addOrder(product))}
                  selected={_.some(orders, { uuid: product.uuid })}
                  key={i * 12 + j}
                />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mb-4 mt-auto flex gap-1">
          {Array.from({ length: Math.ceil((data?.length || 1) / 12) }).map((__, i) => (
            <div
              key={i}
              className={`h-1 rounded-full duration-300 ${slide === i ? 'w-12 bg-primary-500' : 'w-4 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>
      <OrderDetails />
    </main>
  );
};

export default Home;

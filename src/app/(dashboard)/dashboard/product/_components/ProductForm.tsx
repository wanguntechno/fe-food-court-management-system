import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import Autocomplete from '@/components/ui/form/autocomplete';
import FileDropzone from '@/components/ui/form/file-dropzone';
import FormCard from '@/components/ui/form/form-card';
import NumberInput from '@/components/ui/form/number-input';
import TextInput from '@/components/ui/form/text-input';
import getProductCategory from '@/lib/react-query/service/products/getProductCategory';
import { ProductCategoryType } from '@/lib/react-query/service/products/product.type';

import { productFormDefault, productFormSchema, ProductFormType } from '../_utils/product-schema';

interface Props {
  initialValue?: ProductFormType;
  onSubmit: SubmitHandler<ProductFormType>;
  loading?: boolean;
}

const ProductForm = ({ initialValue, onSubmit, loading }: Props) => {
  const { data: categories, isLoading } = useQuery<ProductCategoryType[]>({
    queryKey: ['product-category'],
    queryFn: getProductCategory,
  });

  const { control, handleSubmit } = useForm<ProductFormType>({
    defaultValues: initialValue || productFormDefault,
    resolver: zodResolver(productFormSchema),
  });

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormCard title="Details" subTitle="Title, description, image...">
        <TextInput fullWidth name="name" label="Product name" control={control} />
        <TextInput
          multiline
          rows={4}
          fullWidth
          name="description"
          label="Description"
          control={control}
        />
        <FileDropzone
          name="file_storage_uuid"
          control={control}
          label="Images"
          options={{ accept: { 'image/*': ['.jpeg', '.jpg', '.png'] }, multiple: false }}
        />
      </FormCard>

      <FormCard title="Properties" subTitle="Additional functions and attributes...">
        <Autocomplete
          options={categories?.map((item) => ({ value: item.uuid, label: item.name })) || []}
          control={control}
          name="item_category_uuid"
          renderInputProps={{ label: 'Category' }}
          loading={isLoading}
        />
        <NumberInput
          fullWidth
          name="price"
          label="Price"
          control={control}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
          }}
        />
        <NumberInput fullWidth name="available_stock" label="Stock" control={control} />
        <TextInput fullWidth name="code" label="Product code" control={control} />
      </FormCard>

      <LoadingButton
        loading={loading}
        type="submit"
        variant="contained"
        color="black"
        className="ml-auto w-fit"
      >
        Create Product
      </LoadingButton>
    </form>
  );
};

export default ProductForm;

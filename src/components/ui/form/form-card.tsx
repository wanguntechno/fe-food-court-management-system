import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper, { PaperProps } from '@mui/material/Paper';

interface Props extends PaperProps {
  title?: string;
  subTitle?: string;
}

const FormCard = ({ title, subTitle, children, ...props }: Props) => {
  return (
    <Paper variant="outlined" {...props} className="rounded-xl">
      {(title || subTitle) && (
        <>
          <CardHeader
            titleTypographyProps={{
              variant: 'h6',
            }}
            subheaderTypographyProps={{
              variant: 'body2',
            }}
            title={title}
            subheader={subTitle}
            className="p-6"
          />
          <Divider className="my-0" />
        </>
      )}
      <CardContent className="flex flex-col gap-5 p-6">{children}</CardContent>
    </Paper>
  );
};

export default FormCard;

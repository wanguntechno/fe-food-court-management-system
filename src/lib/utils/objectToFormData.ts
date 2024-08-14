import uploadFile from './uploadFile';

/* eslint-disable @typescript-eslint/no-explicit-any */
const objectToFormData = async (jsonData: any): Promise<FormData> => {
  const formData = new FormData();

  const appendToFormData = async (key: string, value: any) => {
    if (Array.isArray(value)) {
      await Promise.all(value.map((item, index) => appendToFormData(`${key}[${index}]`, item)));

      return;
    }

    if (typeof value === 'object' && value !== null) {
      await Promise.all(
        Object.entries(value).map(([subKey, subValue]) =>
          appendToFormData(`${key}[${subKey}]`, subValue),
        ),
      );

      return;
    }

    if (value instanceof File) {
      const fileUuid = await uploadFile(value);
      console.log('🚀 ~ appendToFormData ~ fileUuid:', fileUuid);
      formData.append(key, fileUuid);

      return;
    }

    formData.append(key, value);
  };

  await Promise.all(Object.entries(jsonData).map(([key, value]) => appendToFormData(key, value)));

  return formData;
};

export default objectToFormData;

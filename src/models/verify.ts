import {
  createUbo,
  delUbo,
  getCorporateSelf,
  getUboList,
  getVeriSelf,
  upload,
} from '@/services/user';
import { useModel } from '@umijs/max';
import { Upload } from 'antd';
import { useState } from 'react';

export default function () {
  const [uboModal, setUboModal] = useState(false);
  const [individualData, setIndividualData] = useState({});
  const [businessData, setBusinessData] = useState<any>({});
  const [uboList, setUboList] = useState([]);
  const [verifi, setVerifi] = useState<any>({}); // 只给第一页加的
  const [corporate, setCorporate] = useState<any>({}); // 只给第一页加的
  const { setLoading } = useModel('global');
  const { user } = useModel('auth');
  const { setAlertInfo } = useModel('dialogState');

  const handleGetUboList = async () => {
    const res = await getUboList({
      realnessId: businessData.id,
    });
    setUboList(res?.data?.list || []);
  };
  const handleDelUbo = async (id: any) => {
    await delUbo({
      id,
    });

    setAlertInfo({
      type: 'success',
      message: 'Delete successfully!',
      show: true,
    });
    handleGetUboList();
  };
  const handleCreateUbo = async (values: any) => {
    await createUbo({
      realnessId: businessData.id,
      ...values,
    });
    handleGetUboList();
  };
  const handleUploadChange = ({ file, fileList }: any, key: string) => {
    console.log(file, fileList, 'onchange');
    if (file.status === 'uploading') {
      setIndividualData({
        ...individualData,
        [`${key}_fileList`]: fileList,
      });
    }
    if (file.status === 'done') {
      setIndividualData({
        ...individualData,
        [key]: file?.response?.data,
        [`${key}_fileList`]: fileList,
      });

      return;
    }
    if (file.status === 'removed') {
      setIndividualData({
        ...individualData,
        [key]: '',
        [`${key}_fileList`]: [],
      });

      return;
    }
  };
  const beforeUpload = async (file: any) => {
    if (file.size > 50 * 1024 * 1024) {
      setAlertInfo({
        type: 'error',
        message: 'File size exceeds 150KB',
        show: true,
      });
      return Upload.LIST_IGNORE;
    }
    return file;
  };

  const uploadFile = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append('file', file);
    try {
      setLoading(true);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const res = await upload(formData, config);
      onSuccess(res);
    } catch (error: any) {
      onError(error);
      // message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const init = () => {
    if (!user.id) return;
    getVeriSelf().then((res) => {

      setVerifi(res?.data || {});

      if (res?.data?.status === 0) {
        setIndividualData(res.data || {});
      }
    });
    getCorporateSelf().then((res) => {
      setCorporate(res?.data || {});

      if (
        res?.data?.status === 0 ||
        res?.data?.status === 1 ||
        res?.data?.status === 3
      ) {
        setBusinessData(res.data || {});
      }
    });
  };

  return {
    init,
    verifi,
    corporate,
    handleDelUbo,
    handleCreateUbo,
    handleGetUboList,
    uboList,
    businessData,
    setBusinessData,
    individualData,
    setIndividualData,
    handleUploadChange,
    beforeUpload,
    uploadFile,
    uboModal,
    setUboModal,
  };
}

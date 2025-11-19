import { useState } from 'react';

export default function () {
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  return {
    loading,
    setLoading,
    confirmModal,
    setConfirmModal,
  };
}

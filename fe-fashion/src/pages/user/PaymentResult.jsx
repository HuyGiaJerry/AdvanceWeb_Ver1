import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const vnp_ResponseCode = queryParams.get('vnp_ResponseCode'); // Mã phản hồi từ VNPAY
    const vnp_TransactionStatus = queryParams.get('vnp_TransactionStatus'); // Trạng thái giao dịch

    useEffect(() => {
        if (vnp_ResponseCode === '00') {
            toast.success('Thanh toán thành công!');
        } else {
            toast.error('Thanh toán thất bại. Vui lòng thử lại.');
        }
    }, [vnp_ResponseCode]);

    return (
        <div className="payment-result text-center" style={{ marginTop: '100px' }}>
            <h1>Kết quả thanh toán</h1>
            {vnp_ResponseCode === '00' ? (
                <p>Thanh toán thành công! Cảm ơn bạn đã mua hàng.</p>
            ) : (
                <p>Thanh toán thất bại. Vui lòng thử lại.</p>
            )}
        </div>
    );
};

export default PaymentResult;
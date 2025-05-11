import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import checkIcon from '../../assets/images/check.png'; // Import hình ảnh
import xicon from '../../assets/images/x.png'; // Import hình ảnh

const PaymentResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const status = queryParams.get('status'); // Lấy trạng thái thanh toán từ URL
    const orderId = queryParams.get('orderId'); // Lấy mã đơn hàng từ URL

    useEffect(() => {
        if (status === 'success') {
            toast.success('Thanh toán thành công!');
        } else {
            toast.error('Thanh toán thất bại. Vui lòng thử lại.');
        }
    }, [status]);

    return (
        <div className="payment-result text-center" style={{ marginTop: '100px', marginBottom: '400px' }}>
            <h1>Kết quả thanh toán</h1>
            {status === 'success' ? (
                <div>
                    <p>Thanh toán thành công! Cảm ơn bạn đã mua hàng.</p>
                    {/* Hiển thị icon check */}
                    <img
                        src={checkIcon}
                        alt="Thanh toán thành công"
                        style={{ marginTop: '20px', width: '150px', height: '150px' }}
                    />
                    <p>
                        Mã đơn hàng: <strong>{orderId}</strong>
                    </p>
                    <Link to={`/order/${orderId}`} className="btn btn-primary">
                        Xem chi tiết đơn hàng
                    </Link>
                </div>
            ) : (
                <div>
                    <p>Thanh toán thất bại. Vui lòng thử lại.</p>
                    <img
                        src={xicon}
                        alt="Thanh toán thành công"
                        style={{ marginTop: '20px', width: '150px', height: '150px' }}
                    />

                </div>
            )}
        </div>
    );
};

export default PaymentResult;
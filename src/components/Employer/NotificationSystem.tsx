import React, { useEffect, useState } from "react";
import { useSearchParams, Link, NavLink } from "react-router-dom";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import classes from "./../../components/Employer/NotificationSystem.module.css";
import HeaderSystem from "./HeaderSystem";
import { AxiosResponse } from "axios";
import { GetNotifications } from "../../Services/JobsPostActivity/GetNotifications";
import { Notification } from "./HeaderSystemEmployer";
import moment from "moment";

// Giả sử đây là dữ liệu danh sách thông báo
const notificationsData = [
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
  { date: "27/9/2024", message: "Another candidate has applied for a different position" },
  // Thêm nhiều thông báo khác ở đây...
  // Giả sử chúng ta có nhiều hơn 10 thông báo để test phân trang
];

export default function NotificationSystem() {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1"); // Lấy giá trị page từ query string, mặc định là 1
  const notificationsPerPage = 10; // Số lượng thông báo trên mỗi trang
  const [notification, setNotifications] = useState<Notification[]>([]);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(notification?.length / notificationsPerPage);

  // Lấy ra danh sách thông báo thuộc trang hiện tại
  const currentNotifications = notificationsData.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  const pagingNotifications = (listNotify: Notification[]): Notification[] => {
    return listNotify.slice(
      (currentPage - 1) * notificationsPerPage,
      currentPage * notificationsPerPage
    );
  }

  const fetchNotifications = async () => {
    try {
      var response: AxiosResponse = await GetNotifications();
      if (response?.status === 200) {
        const notifications = response.data as Notification[];
        setNotifications(pagingNotifications(notifications));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Hàm để render thông báo dựa trên trang hiện tại
  const renderNotifications = () => {
    return notification?.map((notification, index) => (
      <div key={index} className={classes.main3}>
        <div className={classes.main4}>
          <div className={classes.main5}>
            <span className={classes.span}>Notification</span>
          </div>
          <div className={classes.main6}>{moment(notification.createdDate).format('YY-MM-DD')}</div>
          <Link to="" className={classes.link}>
            {notification.title}
          </Link>
        </div>
        <hr className={classes.hr} />
      </div>
    ));
  };

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Notification System" appear={true} />
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>
          {renderNotifications()}
        </div>

        {/* Điều hướng trang */}
        <nav className={classes.nav}>
          <ul className={classes.ul}>
            {/* Các nút điều hướng trang */}
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={classes.li}>
                <NavLink
                  to={`?page=${index + 1}`}
                  className={({ isActive }) =>
                    currentPage === index + 1  && isActive? classes.active : undefined
                  }
                >
                  {index + 1}
                </NavLink>
              </li>
            ))}

            {/* Nút chuyển tới trang kế tiếp */}
            <li className={classes.li}>
              <NavLink
                to={`?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                className={classes.link}
              >
                <NavigateNextOutlinedIcon fontSize="small" sx={{ fontSize: '10px', display: 'inline-block', height: '12px' }} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

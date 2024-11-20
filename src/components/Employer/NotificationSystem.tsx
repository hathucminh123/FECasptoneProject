import React, { useEffect, useState } from "react";
import { useSearchParams, Link, NavLink } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import classes from "./../../components/Employer/NotificationSystem.module.css";
import HeaderSystem from "./HeaderSystem";
import { AxiosResponse } from "axios";
import {
  HttpTransportType,
  HubConnectionBuilder,
  IHttpConnectionOptions,
} from "@microsoft/signalr";
import {
  GetNotifications,
  ReadAllNotifications,
  ReadNotification,
} from "../../Services/JobsPostActivity/GetNotifications";
import { Notification } from "./HeaderSystemEmployer";
import { signalR } from "../../Services/mainService";
import moment from "moment";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MarkAsUnreadIcon from '@mui/icons-material/Drafts';
import { useOutletContext } from 'react-router-dom';

// Giả sử đây là dữ liệu danh sách thông báo
// const notificationsData = [
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   { date: "26/9/2024", message: "A candidate has applied for the position at your company" },
//   { date: "27/9/2024", message: "Another candidate has applied for a different position" },
//   // Thêm nhiều thông báo khác ở đây...
//   // Giả sử chúng ta có nhiều hơn 10 thông báo để test phân trang
// ];

type OutletContextType = {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
};
export default function NotificationSystem() {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1"); // Lấy giá trị page từ query string, mặc định là 1
  const notificationsPerPage = 10; // Số lượng thông báo trên mỗi trang
  // const [notification, setNotifications] = useState<Notification[]>([]);
  const { notifications, setNotifications } = useOutletContext<OutletContextType>();
  const token = localStorage.getItem("token");
  

  // Tính toán tổng số trang
  const totalPages = Math.ceil(notifications?.length / notificationsPerPage);

  // Lấy ra danh sách thông báo thuộc trang hiện tại
  // const currentNotifications = notificationsData.slice(
  //   (currentPage - 1) * notificationsPerPage,
  //   currentPage * notificationsPerPage
  // );

  const pagingNotifications = (listNotify: Notification[]): Notification[] => {
    return listNotify.slice(
      (currentPage - 1) * notificationsPerPage,
      currentPage * notificationsPerPage
    );
  };

  const startConnection = async () => {
    try {
      const options: IHttpConnectionOptions = {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return `${token}`;
        },
      };

      const connection = new HubConnectionBuilder()
        .withUrl(signalR.employer.getNotificationsURL, options)
        .build();

      connection.on(
        signalR.employer.groupNotificationsKey,
        async (receivedMessage) => {
          await fetchNotifications();
          console.log(`Notify: ${receivedMessage}`);
        }
      );

      connection.onclose(() => {
        console.log("closed");
      });

      await connection.start();
      return () => {
        connection.stop();
      };
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotifications = async () => {
    try {
      const response: AxiosResponse = await GetNotifications();
      if (response?.status === 200) {
        const notifications = response.data as Notification[];
        setNotifications(pagingNotifications(notifications));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const readNotifications = async (id: number | string) => {
    try {
      const response: AxiosResponse = await ReadNotification(id);
      if (response?.status === 200) {
        await fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readAllNotifications = async () => {
    try {
      const response: AxiosResponse = await ReadAllNotifications();
      if (response?.status === 200) {
        await fetchNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const readAllNotify = () => {
    readAllNotifications();
  }

  useEffect(() => {
    startConnection();
    fetchNotifications();
  }, []);


  const [readOpen, setReadOpen] = useState<{ [key: number]: boolean }>({});
  const handleOpenReadMark = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    setReadOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  const readNotify = (id: string | number) => {
    readNotifications(id);
  }

  const renderNotifications = () => {
  
    return notifications?.map((notification, index) => (
      <div key={index} className={classes.main3}>
        <div className={classes.main4}>
          <div className={classes.main5}>
            <span className={classes.span}>Notification</span>
          </div>
          <div className={classes.main6}>
            {moment(notification.createdDate).format("DD-MM-YYYY")}
          </div>
          <Link to="" className={classes.link}>
            {notification.title}
          </Link>
          <div className={classes.div9}>
            <div className={classes.div10}>
              <span
                className={classes.span3}
                onClick={(e) => handleOpenReadMark(e, notification.id)}
              >
                <MoreHorizOutlinedIcon fontSize="small" />
              </span>
              {readOpen[notification.id] && (
                <div className={classes.div11}>
                  <Link
                    to="#"
                    className={classes.link2}
                    onClick={() => readNotify(notification.id)}
                  >
                    Mark as read
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className={classes.hr} />
      </div>
    ));
  };

  return (
    <div className={classes.main}>
      <div className={classes.div}>
        <HeaderSystem title="Notification System" buttonstring="Mark all as Read"  icon={<MarkAsUnreadIcon/>} onclick={readAllNotify}/>
      </div>
      <div className={classes.main1}>
        <div className={classes.main2}>{renderNotifications()}</div>

        <nav className={classes.nav}>
          <ul className={classes.ul}>
            {/* Các nút điều hướng trang */}
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={classes.li}>
                <NavLink
                  to={`?page=${index + 1}`}
                  className={({ isActive }) =>
                    currentPage === index + 1 && isActive
                      ? classes.active
                      : undefined
                  }
                >
                  {index + 1}
                </NavLink>
              </li>
            ))}

            {/* Nút chuyển tới trang kế tiếp */}
            <li className={classes.li}>
              <NavLink
                to={`?page=${
                  currentPage < totalPages ? currentPage + 1 : totalPages
                }`}
                className={classes.link}
              >
                <NavigateNextOutlinedIcon
                  fontSize="small"
                  sx={{
                    fontSize: "10px",
                    display: "inline-block",
                    height: "12px",
                  }}
                />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

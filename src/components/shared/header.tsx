import { useCallback, useRef, useState } from "react";
import { Link, useNavigate, useRoutes } from "react-router-dom";
import Avatar from "components/avatar";
import { deleteTokenAuth } from "store/auth";
import { useAppDispatch, useAppSelector } from "store";
import Typography from "components/typography";
import Icon from "components/icon";

interface HeaderProps {
  className?: string;
}

interface HeaderMenuProps {
  handleClickLogout: () => void;
}

// const HeaderMenu: React.FC<HeaderMenuProps> = ({
//   handleClickLogout,
// }): JSX.Element => {
//   return (
//     <Menu className="z-[999] fixed top-[60px] right-[20px] bg-white w-56">
//       <Menu.Item>
//         <Link
//           to="#"
//           className="flex items-center gap-2"
//         >
//           <FiSettings size={20} />
//           <span className="font-bold">Settings</span>
//         </Link>
//       </Menu.Item>
//       <Menu.Item>
//         <div
//           onClick={handleClickLogout}
//           className="flex items-center gap-2"
//         >
//           <FiLogOut size={20} />
//           <span className="font-bold">Logout</span>
//         </div>
//       </Menu.Item>
//     </Menu>
//   );
// };

const Header: React.FC<HeaderProps> = ({
  className,
}): JSX.Element => {
  const [toolbarMenuVisible, setToolbarMenuVisible] = useState<boolean>(false);
  const toggleToolbarMenuVisible = () => setToolbarMenuVisible((prev) => !prev);
  const { title, hasBackButton } = useAppSelector(state => state.globalComponent);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleShowDialog = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleCloseDialog = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const handleLogout = () => {
    dispatch(deleteTokenAuth());
  };

  const handleBackButton = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <nav
      className={`z-[998] select-none w-[80%] h-[72px] bg-white border-b border-border shadow-md px-6 fixed right-0 top-0 flex justify-between items-center ${className}`}
    >
      <div
        className="flex justify-between items-center flex-row gap-5"
      >
        {
          hasBackButton &&
          <button onClick={handleBackButton}>
            <Icon name="arrow-left" size={20} />
          </button>
        }
        {title &&
          <Typography variant="heading3" as="h1" className="tracking-tight">
            {title}
          </Typography>
        }
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <div
          onClick={toggleToolbarMenuVisible}
          className="flex items-center gap-2 cursor-pointer p-2"
        >
          <Avatar
            size="xs"
            shape="circle"
            src="https://avatars.githubusercontent.com/u/2?v=4"
          />
        </div>
      </div>
      {/* {toolbarMenuVisible && (
          <HeaderMenu handleClickLogout={handleLogout} />
        )} */}
    </nav>
  );
};

export default Header;

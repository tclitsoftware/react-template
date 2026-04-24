import { useCallback, useRef, useState } from "react";
import { Link, useNavigate, useRoutes } from "react-router-dom";
import Avatar from "components/avatar";
import { deleteTokenAuth } from "store/auth";
import { useAppDispatch, useAppSelector } from "store";
import Typography from "components/typography";
import Icon from "components/icon";
import TclLogo from "assets/images/tcl.png";
import { toggleSideBar } from "store/global-components";
import { useAppTranslation } from "locale/useAppTranslation";
import { useLanguageSwitcher } from "locale/useLanguageSwitcher";

interface HeaderProps {
  className?: string;
}

interface HeaderMenuProps {
  handleClickLogout: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  handleClickLogout,
}): JSX.Element => {
  const { t } = useAppTranslation("login");
  const { languages, setLanguage } = useLanguageSwitcher();

  return (
    <div className="z-[999] fixed top-[60px] right-[20px] bg-white w-56 shadow-lg border px-2 py-4 rounded-lg">
      <div className="mb-3 pb-3 border-b">
        <Typography variant="body" tone="muted" className="mb-2 text-xs font-semibold">
          {t("label-language")}
        </Typography>
        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`text-sm px-2 py-1.5 rounded-md transition-colors text-left ${
                lang.active
                  ? "bg-primary-100 text-primary-600 font-semibold"
                  : "hover:bg-greyScale-90 text-greyScale-700"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
      <div
        onClick={handleClickLogout}
        className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
      >
        <Icon name="logout" />
        <span className="font-bold">{t("btn-logout")}</span>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({
  className,
}): JSX.Element => {
  const [toolbarMenuVisible, setToolbarMenuVisible] = useState<boolean>(false);
  const toggleToolbarMenuVisible = () => setToolbarMenuVisible((prev) => !prev);
  const { title, hasBackButton, showSideBar } = useAppSelector(state => state.globalComponent);
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
      className={`z-[999] select-none w-full h-[72px] bg-white border-b border-border fixed right-0 top-0 flex items-center ${className}`}
    >
      <div className="w-[20%] h-full border-r border-border px-6 flex flex-row justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
            <img src={TclLogo} alt="TCL" className="h-10 w-10 object-contain" />
          </div>
          <span className="text-2xl font-semibold text-primary">TCL</span>
        </div>
        <button className="h-12 w-12 flex items-center justify-end cursor-pointer" onClick={() => dispatch(toggleSideBar())}>
          <Icon name={showSideBar ? "arrow-left-2" : "menu-2"} size={16} />
        </button>
      </div>
      <div className="flex flex-row justify-between w-[80%] items-center px-6">
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
      </div>
      {toolbarMenuVisible && (
        <HeaderMenu handleClickLogout={handleLogout} />
      )}
    </nav>
  );
};

export default Header;

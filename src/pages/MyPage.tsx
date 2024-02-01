import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiSideTabLayout from "../Layouts/MultiSideTabLayout";
import { DeleteUser } from "../api/apis";
import CommonModal from "../components/CommonModal";
import useAuth from "../utils/useAuth";
import "./MyPage.scss";

export default function MyPage() {
  const navigator = useNavigate();
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showErrDeleteUserModal, setErrShowDeleteUserModal] = useState(false);

  const { logout } = useAuth();
  function DeleteUserPage() {
    return (
      <div className="mypage_delete_user">
        <button
          onClick={async () => {
            try {
              await DeleteUser();
              setShowDeleteUserModal(true);
            } catch {
              setErrShowDeleteUserModal(true);
            }
          }}
        >
          회원탈퇴
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mypage_wrapper">
        <MultiSideTabLayout
          tabList={["회원탈퇴", "2", "3"]}
          tabPageList={[<DeleteUserPage />, <></>, <></>]}
        />
        <CommonModal
          showModal={showDeleteUserModal}
          title="회원탈퇴 성공"
          message="회원탈퇴에 성공하였습니다. 그동안 이용해주셔서 감사합니다."
          onDisapppear={async () => {
            setShowDeleteUserModal(false);
            await logout();
            navigator("/");
          }}
        />
        <CommonModal
          showModal={showErrDeleteUserModal}
          title="회원탈퇴 실패"
          message="회원탈퇴에 실패하였습니다. 잠시 후 다시 시도해주세요."
          onDisapppear={() => setErrShowDeleteUserModal(false)}
        />
      </div>
    </>
  );
}

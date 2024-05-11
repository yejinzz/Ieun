import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useGetMemberId } from "./hooks/useGetMemberId";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import MainLayout from "./pages/MainLayout";
import PrivateRoute from "./pages/PrivateRoute";
import Loading from "./Loading";
import PublicRoute from "./pages/PublicRoute";
const MainPage = lazy(() => import("./pages/Main/MainPage"));
const UserSelectionPage = lazy(() =>
  import("./pages/Signup/UserSelectionPage")
);
const SignupPage = lazy(() => import("./pages/Signup/SignupPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));

const FundingPage = lazy(() => import("./pages/Funding/FundingPage"));
const FundingDetail = lazy(() =>
  import("./pages/Funding/DetailPage/FundingDetail")
);
const FundingCreatePage = lazy(() =>
  import("./pages/Funding/CreatePage/FundingCreatePage")
);
const FundingEditPage = lazy(() =>
  import("./pages/Funding/EditPage/FundingEditPage")
);
const StorePage = lazy(() => import("./pages/Store/StorePage"));
const StoreDetail = lazy(() => import("./pages/Store/DetailPage/StoreDetail"));
const StoreCreatePage = lazy(() =>
  import("./pages/Store/CreatePage/StoreCreatePage")
);
const StoreEditPage = lazy(() =>
  import("./pages/Store/EditPage/StoreEditPage")
);
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));

const App = () => {
  const { pathname } = useLocation();

  const { getMemberId } = useGetMemberId();

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    getMemberId();
  }, [userData.memberId]);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<PublicRoute />}>
            <Route element={<UserSelectionPage />} path="/signup" />
            <Route element={<SignupPage />} path="/signup/:role" />
            <Route element={<LoginPage />} path="/login" />
          </Route>
          <Route element={<MainLayout pathname={pathname} />}>
            <Route element={<StorePage />} path="/store" />
            <Route element={<StoreDetail />} path="/storedetail/:id" />
            <Route element={<FundingPage />} path="/funding" />
            <Route element={<FundingDetail />} path="/fundingdetail/:id" />
            <Route element={<AboutPage />} path="/about" />
            <Route element={<MyPage />} path="/mypage/:path" />
            <Route element={<PrivateRoute />}>
              <Route element={<FundingCreatePage />} path="/fundingcreate" />
              <Route element={<FundingEditPage />} path="/fundingedit/*" />
              <Route element={<StoreCreatePage />} path="/storecreate" />
              <Route element={<StoreEditPage />} path="/storeedit/*" />
            </Route>
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

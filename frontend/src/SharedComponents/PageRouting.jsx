import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";

const Homepage = lazy(() => import("../EverythingForHomepage/Homepage"));
const Authpage = lazy(() => import("../EverythingForAuthentication/Authenticationpage"));
const Quizpage = lazy(() => import("../EverythingForQuizpage/Quizpage"));
const Resultpage = lazy(() => import("../EverythingForResultpage/Resultpage"));
const Accountpage = lazy(() => import("../EverythingForAccountpage/Accountpage"));
const NotFound = lazy(() => import("./NotFound"));

function PageRouting() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/quizpage" element={<Quizpage />} />
          <Route path="/result" element={<Resultpage />} />
          <Route path="/account" element={<Accountpage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default PageRouting;

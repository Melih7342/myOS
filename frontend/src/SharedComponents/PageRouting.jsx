import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./authContext";

const Homepage = lazy(() => import("../EverythingForHomepage/Homepage"));
const Authpage = lazy(() => import("../EverythingForAuthentication/Authenticationpage"));
const Quizpage = lazy(() => import("../EverythingForQuizpage/Quizpage"));
const Resultpage = lazy(() => import("../EverythingForResultpage/Resultpage"));
const Accountpage = lazy(() => import("../EverythingForAccountpage/Accountpage"));
const Detailpage = lazy(() => import("../EverythingForDetailpage/Detailpage"));
const Catalogpage = lazy(() => import("../EverythingForCatalogpage/Catalogpage.jsx"));
const Postpage = lazy(() => import('../EverythingForPostpage/Postpage'));
const PostReviewpage = lazy(() => import('../EverythingForPostReviewpage/PostReviewpage'));
const Commentpage = lazy(() => import('../EverythingForCommentpage/Commentpage'));
const NotFound = lazy(() => import("./NotFound"));
const Glossarypage = lazy(() => import("../EverythingForGlossaryPage/GlossaryPage"));

function PageRouting() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/auth' element={<Authpage />} />
            <Route path='/quizpage' element={<Quizpage />} />
            <Route path='/result' element={<Resultpage />} />
            <Route path='/account' element={<Accountpage />} />
            <Route path='/detail/:id' element={<Detailpage />} />
            <Route path='/catalog' element={<Catalogpage />} />
            <Route path='/post' element={<Postpage />} />
            <Route path='/postReview' element={<PostReviewpage />} />
            <Route path='/comment' element={<Commentpage />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/glossary' element={<Glossarypage />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default PageRouting;

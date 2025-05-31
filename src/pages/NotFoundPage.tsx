import { A } from "@solidjs/router";
import Section from "../layout/Section";
import Layout from "../layout/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <Section id="not-found">
        <div class="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 class="text-2xl font-semibold text-white mb-8">Page Not Found</h2>
          <p class="text-gray-400 mb-8">
            Oops! The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <A href="/" class="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            Go Back Home
          </A>
        </div>
      </Section>
    </Layout >
  );
};

export default NotFoundPage;
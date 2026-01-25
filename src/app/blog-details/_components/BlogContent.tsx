import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export default function BlogContent() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h2>Introduction</h2>

      <p>
        Software as a Service (SaaS) has transformed the way businesses operate, providing access to
        a wide range of applications and tools through the internet.
      </p>

      <p>
        One of the biggest benefits of using a SaaS solution is that it eliminates the need for
        businesses to invest in expensive hardware or IT infrastructure.
      </p>

      <ImageWithFallback
        src="/images/blog-detail.jpg"
        alt="Blog detail"
        width={1200}
        height={600}
        className="rounded-xl"
      />

      <h3>1. Increased Efficiency and Productivity</h3>
      <p>
        Macivate offers a range of features that can help your team work more efficiently and
        productively.
      </p>

      <h3>2. Improved Customer Satisfaction</h3>
      <p>
        With Macivate, you can enhance the customer experience by providing a seamless and
        personalized experience.
      </p>

      <h3>3. Enhanced Data Analysis</h3>
      <p>
        Data is a critical component of any business, and SaaS products offer advanced analytics
        tools.
      </p>

      <h3>4. Streamlined Billing and Payments</h3>
      <p>Managing payments and billing can be a time-consuming process.</p>

      <h3>5. Scalability and Flexibility</h3>
      <p>Macivate is highly scalable and can be easily customized to meet your business needs.</p>
    </article>
  );
}

import Head from 'next/head'
import Image from 'next/image'

import Layout from '../components/layout/layout';

export default function Home() {
  const why_us = [
    {
      image: "/assets/images/why-us/secure.png",
      title: "Secure",
      content: "Stakin leverages on the infrastructure of leading cloud and Tier 3 colocation providers so you don’t have to operate a node by yourself. We also use sentry nodes, HSMs, and live monitoring tools to ensure that our validation operations run with 99%+ uptime.",
    },
    {
      image: "/assets/images/why-us/skin.png",
      title: "Skin In the Game",
      content: "As a dedicated staking provider, we are completely aligned with the interest of our token holders. With our own digital assets also locked up, we are fully engaged towards the success of each of the protocols where we operate.",
    },
    {
      image: "/assets/images/why-us/education.png",
      title: "Education",
      content: "Our expertise goes far beyond running nodes. Stakin is very involved in governance debates and proposals. We also educate both crypto holders and non-crypto holders thanks to simple guides and non-technical how-tos. Staking with us helps us maintain our positive contributions.",
    }
  ];

  return (
    <>
      <Head>
        <title>Stakin Test Project</title>
        <meta name="description" content="Stakin Test Project from Jie Li."/>
      </Head>
      <Layout>
        <section className="relative">
          <div className="h-700 overflow-auto">
            <h1 className="text-center py-50 text-24 font-bold">Why Stakin?</h1>
            <div className="md:flex items-start justify-center px-20 lg:px-100">
              {why_us.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-15 md:w-1/3">
                  <Image src={item.image} width={150} height={150} alt={item.title}/>
                  <p className="py-15 text-20 font-bold text-warning">{item.title}</p>
                  <p className="text-light-400">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

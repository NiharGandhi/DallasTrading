import { Component, ReactNode } from "react";
import styles from "./news.module.scss";
import ShadowHeading from "../../components/common/headings/shadowHeading/shadowHeading";
import { INewsProps, INewsStates, INewsItem } from "./news.constants";
import BreadCrumb from "../../components/common/breadCrumb/breadCrumb";

class News extends Component<INewsProps, INewsStates> {
  componentDidMount(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  newsData: INewsItem[] = [
    {
      id: 1,
      reference: "PCE",
      title: "Strengthening Partnerships at Middle East Energy (MEE) 2025 – Dubai",
      date: "April 2025",
      location: "Dubai, UAE",
      content: [
        "There's something special about meeting long-time partners face-to-face — especially in an environment buzzing with innovation and opportunity.",
        "At Middle East Energy (MEE) 2025, held at the Dubai World Trade Centre, the Dallas Trading Co. LLC team had the pleasure of reconnecting with our valued principal partner, PCE Austria.",
        "Represented by Mr. Jay Ahuja (Executive Director), Mr. Vijay Ahuja (Director – Oman), Mr. Amjad Ali (General Manager), and Mr. Navjot (Sales Manager – Bahrain), the Dallas team visited the PCE Austria booth to discuss new ideas, strengthen collaboration, and explore ways to expand our shared footprint in the energy and electrical sectors.",
        "It was an inspiring exchange — a reflection of the strong relationship built over years of mutual trust and growth.",
        "Here's to continued success and new milestones together with PCE Austria!"
      ],
      images: [
        "/news/PCE/PCE_1.jpeg",
        "/news/PCE/PCE_2.jpeg"
      ],
      hashtags: ["#DallasTrading", "#PCEAustria", "#MiddleEastEnergy", "#MEE2025", "#Partnerships", "#EnergyInnovation", "#Dubai", "#Collaboration"]
    },
    {
      id: 2,
      reference: "3M",
      title: "Dallas Trading Co. LLC Honored with the 3M Best Award",
      date: "2024",
      location: "Dubai, UAE",
      content: [
        "At Dallas Trading Co. LLC, moments like these remind us why dedication, collaboration, and trust truly matter.",
        "We are proud to share that our long-standing partner, 3M, has recognized Dallas Trading Co. LLC with the 3M Best Award for our outstanding contribution to the 3M Electrical Market Business for 2024.",
        "The recognition was presented during a special ceremony in Dubai, where our leadership team — Mr. Jay Ahuja (Executive Director), Mr. Vijay Ahuja (Director – Oman Operations), and Mr. Amjad Ali (General Manager) — had the privilege of accepting the award on behalf of our entire organization.",
        "This honor is more than a milestone; it reflects the strength of our partnership with 3M and our shared vision of driving innovation, reliability, and growth in the electrical market. Behind every achievement stands a dedicated team, supportive partners, and loyal customers — and this recognition belongs to all of them.",
        "We extend our sincere gratitude to 3M for this acknowledgment and to every member of the Dallas Trading family for their relentless commitment to excellence. Together, we continue to power progress and build a brighter, more connected future."
      ],
      images: [
        "/news/3M/3M_1.jpeg",
        "/news/3M/3M_2.jpeg",
        "/news/3M/3M_3.jpeg",
        "/news/3M/3M_4.jpeg"
      ],
      hashtags: ["#DallasTrading", "#3M", "#Award", "#Excellence", "#Partnership", "#ElectricalMarket", "#Dubai"]
    },
    {
      id: 3,
      reference: "Barton",
      title: "Strengthening Partnerships Through Knowledge | Barton Engineering x Dallas Trading Co. LLC",
      date: "September 2025",
      location: "Dubai, UAE",
      content: [
        "We had the pleasure of hosting our valued principal supplier, Barton Engineering, at our Dubai warehouse for an engaging and hands-on product training session!",
        "Led by Mr. Rajnish Kapoor (Chief Operating Officer), the Barton team — including Mr. Sayed Muntajibuddin, Mr. Shivaraj U.B, Mr. Abdul Kadhar, Mr. Teddy Bretana, and Mr. Patrick Manzano — brought a wealth of expertise and enthusiasm to the session.",
        "Welcomed by our General Manager, Mr. Amjad Ali, and the Dallas Trading Co. team, the day was filled with collaboration, learning, and practical demonstrations focused on:",
        "⚙️ Enhancing technical know-how of Barton's conduit and cable management systems",
        "🔍 Understanding quality testing and global product standards",
        "💪 Live conduit bending demos showcasing Barton's product strength and durability",
        "We're truly grateful to the Barton Engineering team for their time, insights, and commitment to empowering our people. Sessions like these strengthen our partnership and enable us to deliver even greater value and technical excellence to our customers.",
        "Here's to continuous learning, collaboration, and growth together! 🌟"
      ],
      images: [
        "/news/Barton/Barton_1.jpeg",
        "/news/Barton/Barton_2.jpeg",
        "/news/Barton/Barton_3.jpeg",
        "/news/Barton/Barton_4.jpeg",
        "/news/Barton/Barton_5.jpeg"
      ],
      hashtags: ["#DallasTrading", "#BartonEngineering", "#PartnershipInProgress", "#ElectricalSolutions", "#Teamwork", "#KnowledgeSharing", "#Innovation", "#DubaiBusiness", "#TrainingAndDevelopment", "#EngineeringExcellence"]
    }
  ];

  render(): ReactNode {
    return (
      <section className={styles.newsContainer}>
        <BreadCrumb
          items={[
            { moduleName: "Home", link: "/home" },
            { moduleName: "News", link: "" },
          ]}
        />

        <div className={styles.container}>
          <div className={styles.header}>
            <ShadowHeading
              headingText1="Latest"
              headingText2="News"
              backShadowHeading={false}
            />
            <p className={styles.subtitle}>
              Stay updated with our latest partnerships, achievements, and industry insights
            </p>
          </div>

          <div className={styles.newsGrid}>
            {this.newsData.map((newsItem, index) => (
              <article
                key={newsItem.id}
                className={styles.newsCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h2 className={styles.newsTitle}>{newsItem.title}</h2>

                <div className={styles.newsImages}>
                  {newsItem.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`${styles.imageWrapper} ${
                        newsItem.images.length === 1 ? styles.singleImage :
                        newsItem.images.length === 2 ? styles.twoImages :
                        styles.multiImages
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${newsItem.reference} ${imgIndex + 1}`}
                        className={styles.newsImage}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className={styles.newsContent}>
                  {newsItem.content.map((paragraph, paraIndex) => (
                    <p key={paraIndex} className={styles.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className={styles.hashtags}>
                  {newsItem.hashtags.map((hashtag, hashIndex) => (
                    <span key={hashIndex} className={styles.hashtag}>
                      {hashtag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default News;

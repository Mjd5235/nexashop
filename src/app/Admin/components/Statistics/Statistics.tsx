import React from 'react';
import Image from 'next/image';
import styles from './Statistics.module.css';

const Statistics = () => {

  const statsData = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      percentage: '+12%',
      isPositive: true,
      icon: '/Admin/Icons/revenue.svg',
      trendIcon: '/Admin/Icons/up.svg',
      iconClass: styles.iconWrapper
    },
    {
      title: 'Active Users',
      value: '8,549',
      percentage: '+8.2%',
      isPositive: true,
      icon: '/Admin/Icons/users2.svg',
      trendIcon: '/Admin/Icons/up.svg',
      iconClass: styles.activeUsersIconWrapper
    },
    {
      title: 'Total Orders',
      value: '2,847',
      percentage: '+15.3%',
      isPositive: true,
      icon: '/Admin/Icons/orders.svg',
      trendIcon: '/Admin/Icons/up.svg',
      iconClass: styles.totalOrdersIconWrapper
    },
    {
      title: 'Page Views',
      value: '45,892',
      percentage: '-2.1%',
      isPositive: false,
      icon: '/Admin/Icons/views.svg',
      trendIcon: '/Admin/Icons/down.svg',
      iconClass: styles.pageViewsIconWrapper
    }
  ];

  return (
    <div className={styles.bigContainer}>
      <div className={styles.statisticsContainer}>
        {statsData.map((stat, index) => (
          <div key={index} className={styles.product}>
            <div className={styles.cardTitle}>
              {stat.title}
              <div className={stat.iconClass}>
                <Image
                  src={stat.icon}
                  width={24}
                  height={24}
                  alt={stat.title}
                />
              </div>
            </div>

            <div className={styles.valueHeadingBold}>
              <Image
                className={stat.isPositive ? styles.upIcon : styles.downIcon}
                src={stat.trendIcon}
                width={32}
                height={32}
                alt={stat.isPositive ? 'up' : 'down'}
              />
              {stat.value}
            </div>

            <div className={styles.footerWrapperPlain}>
              <span className={styles.footerTextFlexColored}>
                <span className={stat.isPositive ? styles.greenPercentageTight : styles.redPercentage}>
                  {stat.percentage}
                </span>
                vs last month
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

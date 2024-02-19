// pages/page.js

import React from 'react';
import Currentaffairs from './components/Currentaffairs';


export const metadata = {
  title: 'Daily Current Affairs/ कर्रेंट अफेयर्स',
  description: 'Current Affairs for UPSC, BPSC, बिहार दारोगा, SI, BSSC, Railway, JSSC, SSC, BANKING, Defence..',
}

const Page = () => {
  return (
    <div>
      <Currentaffairs  />
    </div>
  );
};

export default Page;

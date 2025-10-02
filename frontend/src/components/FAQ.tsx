import { Collapse } from 'antd-mobile';
import type { ReactNode } from 'react';

export type FAQItem = {
  header: string;
  content: ReactNode;
};

type FAQProps = {
  items: FAQItem[];
};

export const FAQ = ({ items }: FAQProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <Collapse defaultActiveKey={[`faq-0`]}>
      {items.map((item, index) => (
        <Collapse.Panel key={`faq-${index}`} title={item.header}>
          <div className="faq-panel-content">{item.content}</div>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

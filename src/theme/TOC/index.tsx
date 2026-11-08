import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme-original/TOCItems';
import type {TOCItem} from '@docusaurus/mdx-loader';

type TOCProps = {
  toc: readonly TOCItem[];
  className?: string;
  minHeadingLevel?: number;
  maxHeadingLevel?: number;
};

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: TOCProps) {
  return (
    <div className={clsx('mathamaToc', 'thin-scrollbar', className)}>
      <div className="mathamaTocHeading">Di halaman ini</div>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}

import { Empty } from 'antd-mobile';

interface EmptyStateProps {
  description: string;
  image?: string;
  className?: string;
}

const DEFAULT_IMAGE = "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg";

export const EmptyState = ({
  description,
  image = DEFAULT_IMAGE,
  className = 'empty-state'
}: EmptyStateProps) => (
  <Empty
    className={className}
    image={image}
    description={description}
  />
);
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  pageCount: number | null;
}

function Pagination(props: Props) {
  const [pages, setPages] = useState(props.pageCount);
  const navigate = useNavigate();
  const { page } = useParams();

  useEffect(() => {
    setPages(props.pageCount);
  }, [props.pageCount]);

  return (
    <div className="pages container">
      {Array(pages)
        .fill(0)
        .map((_, index) => (
          <button
            onClick={() => {
              navigate(`/page/${index + 1}/`);
            }}
            className={
              (page && index === +page - 1) || (!page && index === 0)
                ? 'pages__button pages__button--active'
                : 'pages__button'
            }
            key={index}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
}

export default Pagination;

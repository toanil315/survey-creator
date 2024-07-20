import { useMemo } from 'react';
import { useLocation, useNavigate, useParams, generatePath } from 'react-router-dom';
import queryString from 'query-string';

export function useRouter() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  return useMemo(() => {
    return {
      navigate,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      location,
      history,
      generatePath,
    };
  }, [navigate, params, location]);
}

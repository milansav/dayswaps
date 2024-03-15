import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { isDefined } from "../helpers/is-defined";
import { DayswapsAnchor } from "./dayswaps/dayswaps-anchor";

type PageTitleProps = {
  children: React.ReactNode;
  root?: boolean;
};

const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const PageTitle: React.FC<PageTitleProps> = ({ children, root }) => {
  const navigate = useNavigate();
  return (
    <PageTitleWrapper>
      <h1 style={{ margin: 0 }}>{children}</h1>
      {!root ? (
        <DayswapsAnchor
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Zpět
        </DayswapsAnchor>
      ) : null}
    </PageTitleWrapper>
  );
};

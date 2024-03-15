import { useNavigate } from "react-router-dom";
import { DayswapsButton } from "../components/dayswaps/dayswaps-button";
import { LogoutButton } from "../components/logout-button";
import { PageLayout } from "../components/page-layout";
import { PageTitle } from "../components/page-title";
import { useMe } from "../contexts/me-context";
import { isDefined } from "../helpers/is-defined";

export const Me = () => {
  const [
    {
      me: { name, email, telephone },
    },
  ] = useMe();
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageTitle root={true}>Me</PageTitle>
      <div>
        <p>{name}</p>
        <p>{email}</p>
        <p>
          {isDefined(telephone)
            ? `Tel: ${telephone}`
            : "Uživatel nemá přiřazené telefonní číslo."}
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DayswapsButton onClick={() => navigate("shifts")}>
            Moje směny
          </DayswapsButton>
          <LogoutButton />
        </div>
      </div>
    </PageLayout>
  );
};

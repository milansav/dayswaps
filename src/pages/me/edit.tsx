import { useForm } from "react-hook-form";
import { PageLayout } from "../../components/page-layout";
import { PageTitle } from "../../components/page-title";
import { useMe } from "../../contexts/me-context";
import { Me } from "../../queries/me-query";
import { DayswapsInput } from "../../components/dayswaps/dayswaps-input";
import { DayswapsInputLabel } from "../../components/dayswaps/dayswaps-input-label";
import { DayswapsButton } from "../../components/dayswaps/dayswaps-button";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_QUERY,
  UpdateUserProps,
  UpdateUserValue,
} from "../../queries/update-user-mutation";
import { isDefined } from "../../helpers/is-defined";

export const EditMe: React.FC = () => {
  const [{ me }, setMe] = useMe();

  const { register, handleSubmit } = useForm<
    Pick<Me["me"], "firstName" | "lastName" | "telephone">
  >({
    defaultValues: {
      lastName: me.lastName,
      firstName: me.firstName,
      telephone: me.telephone,
    },
  });

  const [editMutation] = useMutation<UpdateUserValue, UpdateUserProps>(
    UPDATE_USER_QUERY
  );

  const onSubmit = async (
    data: Pick<Me["me"], "firstName" | "lastName" | "telephone">
  ) => {
    const result = await editMutation({
      variables: {
        userUpdateId: me.id,
        data: data,
      },
    });

    if (!isDefined(result) || !isDefined(result.data)) {
      throw new Error("An error occured while updating user.");
    }

    setMe({ me: result.data.userUpdate });
  };

  return (
    <PageLayout>
      <PageTitle>Upravit osobní údaje</PageTitle>
      <div style={{ width: "15rem" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div>
            <DayswapsInputLabel htmlFor="firstName">Jméno</DayswapsInputLabel>
            <DayswapsInput type="text" {...register("firstName")} />
          </div>
          <div>
            <DayswapsInputLabel htmlFor="lastName">Příjmení</DayswapsInputLabel>
            <DayswapsInput type="text" {...register("lastName")} />
          </div>
          <div>
            <DayswapsInputLabel htmlFor="telephone">Telefon</DayswapsInputLabel>
            <DayswapsInput
              type="tel"
              pattern="^\d{1,4}-\d{6,14}$"
              {...register("telephone")}
            />
          </div>
          <DayswapsButton type="submit">Uložit</DayswapsButton>
        </form>
      </div>
    </PageLayout>
  );
};

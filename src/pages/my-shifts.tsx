import { useQuery } from "@apollo/client";
import {
  MY_SHIFTS_QUERY,
  MyShifts as MyShiftsType,
} from "../queries/my-shifts-query";
import { LoadingState } from "../components/loading-state";
import { isDefined } from "../helpers/is-defined";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components/page-title";
import { PageLayout } from "../components/page-layout";
import { DayswapsButton } from "../components/dayswaps/dayswaps-button";
import { DayswapsInput } from "../components/dayswaps/dayswaps-input";
import { DayswapsInputLabel } from "../components/dayswaps/dayswaps-input-label";
import { useForm } from "react-hook-form";
import React from "react";
import { ISO2RFC3339, getFirstDay, getLastDay } from "../helpers/date-helpers";

const ShiftsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ShiftCard = styled.div`
  width: 300px;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  border: 1px solid #000920;
  border-radius: 1rem;

  position: relative;
  overflow: hidden;
`;

const DateFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;

  gap: 1rem;

  margin-bottom: 1.5rem;
`;

const ShiftDate: React.FC<{
  shift: {
    period: {
      start: string;
      end: string;
    };
  };
}> = ({
  shift: {
    period: { start, end },
  },
}) => (
  <p>
    <b>{new Date(start).toLocaleString()}</b>
    {"-"}
    <b>{new Date(end).toLocaleString()}</b>
  </p>
);

/**
 * @property {string} start - Acts as datetime
 * @property {string} end - Acts as datetime
 */
type Period = { start?: string; end?: string };

export const MyShifts = () => {
  const [period, setPeriod] = React.useState<Period>({
    start: ISO2RFC3339(getFirstDay(new Date()).toISOString()),
    end: ISO2RFC3339(getLastDay(new Date()).toISOString()),
  });

  const { register, handleSubmit } = useForm<Period>({
    defaultValues: period,
  });

  const { loading, data, refetch } = useQuery<MyShiftsType>(MY_SHIFTS_QUERY, {
    variables: {
      period,
    },
  });

  const onSubmit = (data: { start?: string; end?: string }) => {
    setPeriod({
      start: data.start ? data.start : undefined,
      end: data.end ? data.end : undefined,
    });
  };

  React.useEffect(() => {
    refetch();
  }, [period]);

  const navigate = useNavigate();

  return (
    <LoadingState loading={loading} onLoading={<p>loading..</p>}>
      <PageLayout>
        <PageTitle>My Shifts</PageTitle>
        {/* NOTE: This could've been probably replaced with just a month selector. 
        End and Start date would've been picked in onSubmit like:
        `ISO2RFC3339(getFirstDay(theDateWithSelectedMonth).toISOString())` */}
        <DateFilterWrapper>
          <div>
            <DayswapsInputLabel htmlFor="start">
              Začátek období
            </DayswapsInputLabel>
            <DayswapsInput type="date" {...register("start")} />
          </div>
          <div>
            <DayswapsInputLabel htmlFor="end">Konec období</DayswapsInputLabel>
            <DayswapsInput type="date" {...register("end")} />
          </div>
          <div>
            <DayswapsButton onClick={handleSubmit(onSubmit)}>
              Potvrdit
            </DayswapsButton>
          </div>
        </DateFilterWrapper>
        <ShiftsGrid>
          {isDefined(data) &&
            isDefined(data.me) &&
            isDefined(data.me.shifts) &&
            data.me.shifts.map((shift) => (
              <ShiftCard key={shift.id}>
                <div
                  style={{
                    backgroundColor: `#${shift.position.color}`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    paddingBlock: "0.25rem",
                    paddingLeft: "0.5rem",
                  }}
                >
                  <p
                    style={{
                      padding: 0,
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {shift.position.name}
                  </p>
                </div>
                <ShiftDate shift={shift} />
                <p>{shift.userName}</p>
                <DayswapsButton onClick={() => navigate(shift.id)}>
                  otevrit
                </DayswapsButton>
              </ShiftCard>
            ))}
        </ShiftsGrid>
      </PageLayout>
    </LoadingState>
  );
};

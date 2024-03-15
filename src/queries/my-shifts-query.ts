import { gql } from "@apollo/client";

export const MY_SHIFTS_QUERY = gql`
  query MyShiftsQuery($period: PeriodFreeInput) {
    me {
      shifts(period: $period) {
        id
        userName
        period {
          end
          start
        }
        position {
          color
          name
        }
      }
    }
  }
`;

export type MyShifts = {
  me: {
    shifts: Array<{
      id: string;
      userName: string;
      period: {
        /** datetime */
        end: string;
        /** datetime */
        start: string;
      };
      position: {
        color: string;
        name: string;
      };
    }>;
  };
};

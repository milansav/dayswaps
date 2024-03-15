import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { isDefined } from "../helpers/is-defined";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Logo from "../assets/dayswaps.svg?react";
import { DayswapsButton } from "../components/dayswaps/dayswaps-button";
import { DayswapsAnchor } from "../components/dayswaps/dayswaps-anchor";
import { DayswapsInputLabel } from "../components/dayswaps/dayswaps-input-label";
import { DayswapsInput } from "../components/dayswaps/dayswaps-input";
import { DayswapsSpan } from "../components/dayswaps/dayswaps-span";
import { LOGIN_QUERY, LoginFormValues } from "../queries/login-query";

const DayswapsLogoBar = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  justify-content: center;
  align-items: normal;
  width: 100%;
  height: auto;
`;

const DayswapsLoginImage = styled.div`
  flex: 3;
  background: url(https://app.dayswaps.com/image/other-background.jpg);
  background-size: cover;
  background-position: 50% 0;
  margin: 1rem 0 1rem 1rem;
  box-sizing: border-box;
  border-radius: 1.25rem;
`;

const DayswapsLoginFooter: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.75rem",
    }}
  >
    <DayswapsSpan>
      Forgot your password?{" "}
      <DayswapsAnchor href="/restore-password">Reset password.</DayswapsAnchor>
    </DayswapsSpan>
    <DayswapsSpan>
      Don't you have an account?{" "}
      <DayswapsAnchor href="/create-account">Create an account.</DayswapsAnchor>
    </DayswapsSpan>
    <DayswapsSpan style={{ marginTop: "0.75rem" }}>
      <DayswapsAnchor href="/tos" style={{ color: "#000920", fontWeight: 500 }}>
        Terms and Conditions
      </DayswapsAnchor>{" "}
      ·{" "}
      <DayswapsAnchor href="/pp" style={{ color: "#000920", fontWeight: 500 }}>
        Privacy Policy
      </DayswapsAnchor>
    </DayswapsSpan>
  </div>
);

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const [loginMutation] = useMutation(LOGIN_QUERY);

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    const variables = data;
    const result = await loginMutation({ variables });

    if (
      !isDefined(result) ||
      !isDefined(result.data) ||
      !isDefined(result.data.login)
    )
      return;

    const token = result.data.login.token;

    if (token) {
      localStorage.setItem("token", token);
      navigate("/me");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <DayswapsLoginImage />
      <div
        style={{
          flex: 2,
          padding: "2rem 1.75rem",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DayswapsLogoBar>
          <Logo />
        </DayswapsLogoBar>
        <div style={{ margin: "4rem 0" }} />
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70%",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "600",
                  marginBottom: "3rem",
                  fontSize: "1.4rem",
                  lineHeight: "1.6rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                Login to Dayswaps
              </span>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div>
                <DayswapsInputLabel
                  style={{ color: "#000920", display: "block" }}
                  htmlFor="username"
                >
                  E-mail
                </DayswapsInputLabel>
                <DayswapsInput
                  placeholder="Insert email"
                  type="text"
                  {...register("username", { required: true })}
                />
              </div>
              <div>
                <DayswapsInputLabel
                  style={{ color: "#000920", display: "block" }}
                  htmlFor="password"
                >
                  Password
                </DayswapsInputLabel>
                <DayswapsInput
                  type="password"
                  placeholder="Insert password"
                  {...register("password", { required: true })}
                />
              </div>
              <DayswapsButton style={{ marginTop: "1rem" }} type="submit">
                Log In
              </DayswapsButton>
            </form>
          </div>
          <DayswapsLoginFooter />
        </div>
      </div>
    </div>
  );
};

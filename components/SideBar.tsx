import { Avatar, Box, Button, Nav, Sidebar, Tip } from "grommet";
import { Close, User } from "grommet-icons";
import { AuthUserContext } from "next-firebase-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { authSideBar } from "../lib/contents";
import { SideBarTip } from "./SideBarTip";

interface SideBarProps {
  auth: AuthUserContext;
}

const SideBar: FC<SideBarProps> = (props) => {
  const [view, setView] = useState(false);
  // const router = useRouter();

  if (!props.auth.email) {
    return (
      <Sidebar
        background="black"
        width="100px"
        align="centerr"
        header={
          <Link href="/">
            <Avatar src="/carto-campus-dark.png" size="large" />
          </Link>
        }
      ></Sidebar>
    );
  }
  return (
    <Sidebar
      background="black"
      width="100px"
      align="center"
      header={
        <Link href="/dashboard">
          <Avatar src="/carto-campus-dark.png" size="large" />
        </Link>
      }
      footer={
        <Nav gap="small">
          {authSideBar.map((x) => {
            return <SideBarTip {...x} key={Math.random()} />;
          })}
          {!view ? (
            <Tip
              content={
                <Box
                  background="black"
                  pad="small"
                  margin={{ left: "40px" }}
                  round="small"
                >
                  {"Account"}
                </Box>
              }
              dropProps={{ align: { left: "right" } }}
              plain
            >
              <Button
                style={{ borderRadius: "10px" }}
                icon={<User />}
                hoverIndicator
                onClick={(e) => {
                  setView(!view);
                }}
              />
            </Tip>
          ) : (
            <Button
              style={{ borderRadius: "10px" }}
              icon={<User />}
              hoverIndicator
              onClick={(e) => {
                setView(!view);
              }}
            />
          )}
        </Nav>
      }
    >
      {view ? (
        <div
          style={{
            position: "absolute",
            left: "110px",
            bottom: "10px",
            padding: "10px",
            zIndex: 3,
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ paddingTop: "6px" }}>{props.auth.email}</div>
            <Button
              icon={<Close size="small" />}
              onClick={(e) => setView(!view)}
            />
          </div>
          <Button
            label="Sign Out"
            primary
            color="red"
            onClick={async (e) => {
              await props.auth.signOut();
              // router.push("/");
            }}
          />
        </div>
      ) : null}
    </Sidebar>
  );
};

export default SideBar;

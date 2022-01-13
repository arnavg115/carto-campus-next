import React, { FC, useState } from "react";
import Modal from "react-modal";
import {
  Box,
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import styles from "../styles/Dashboard.module.css";
import { Trash, Launch, Close } from "grommet-icons";

import Divider from "./Divider";
import firebase from "firebase";
import { AuthUserContext } from "next-firebase-auth";
import { meterstoft } from "../lib/clientUtils";

interface DashModalProps {
  Auth: AuthUserContext;
  ModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: (or: string, dest: string) => void;
  saved: any[];
  setSaved: React.Dispatch<React.SetStateAction<any[]>>;
  fetchSaved: () => Promise<void>;
  metric: boolean;
  loading: boolean;
}

const DashModal: FC<DashModalProps> = ({
  Auth,
  ModalOpen,
  setModalOpen,
  navigate,
  saved,
  setSaved,
  fetchSaved,
  metric,
  loading,
}) => {
  Modal.defaultStyles.content!.padding = "0px";
  Modal.defaultStyles.overlay!.backgroundColor = "rgba(0,0,0,0.5)";

  async function deleteSaved(ind: number) {
    const toDel = saved[ind];

    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(Auth.id!)
        .collection("routes")
        .doc(toDel.id)
        .delete();
      setSaved(saved.filter((_, i) => i !== ind));
      fetchSaved();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Modal
      isOpen={ModalOpen}
      style={{
        overlay: {
          zIndex: 100,
          padding: "0px",
        },
      }}
    >
      <Box
        width="100%"
        height="100%"
        background="black"
        align="center"
        overflow={{ horizontal: "auto" }}
      >
        <div
          style={{
            width: "calc(100% - 20px)",
            display: "flex",
            flexDirection: "row-reverse",
            padding: "10px",
          }}
        >
          <Button
            style={{
              borderRadius: "10px",
            }}
            icon={<Close />}
            onClick={() => setModalOpen(false)}
            hoverIndicator
          />
        </div>
        <div className={styles.modalBox}>
          <h1>Saved Routes</h1>
          <Divider height="3px" />
          {loading ? (
            <Box width="100%" align="center">
              <Spinner />
            </Box>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom"></TableCell>
                  <TableCell scope="col" border="bottom">
                    Origin
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Destination
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Distance
                  </TableCell>
                  <TableCell scope="col" border="bottom"></TableCell>
                  <TableCell scope="col" border="bottom"></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saved.map((route, ind) => (
                  <TableRow key={Math.random()}>
                    <TableCell scope="row">
                      <strong>{ind + 1}</strong>
                    </TableCell>
                    <TableCell scope="row">{route.origin}</TableCell>
                    <TableCell scope="row">{route.dest}</TableCell>
                    <TableCell scope="row">
                      {metric
                        ? (route.distance / 1000).toFixed(2) + " km"
                        : (meterstoft(route.distance) / 5280).toFixed(2) +
                          " mi"}
                    </TableCell>
                    <TableCell scope="row">
                      <Button
                        onClick={() => deleteSaved(ind)}
                        style={{ borderRadius: "10px" }}
                        icon={<Trash />}
                        hoverIndicator
                      />
                    </TableCell>
                    <TableCell scope="row">
                      <Button
                        icon={<Launch />}
                        onClick={() => navigate(route.origin, route.dest)}
                        style={{ borderRadius: "10px" }}
                        hoverIndicator
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default DashModal;

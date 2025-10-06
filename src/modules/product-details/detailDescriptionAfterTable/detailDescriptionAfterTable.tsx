import { Component, Fragment, ReactNode } from "react";
import styles from "./detailDescriptionAfterTable.module.scss";
import {
  IDetailDescriptionAfterTableProps,
  IDetailDescriptionAfterTableStates,
} from "./detailDescriptionAfterTable.constants";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { getProductDetailDescriptionAfterTable } from "../../../store/product-detail/productDetailActions";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

class DetailDescriptionAfterTable extends Component<
  IDetailDescriptionAfterTableProps,
  IDetailDescriptionAfterTableStates
> {
  render(): ReactNode {
    const { detailDescriptionData } = this.props;
    return (
      <div className={styles.detailDescriptionContainer}>
        {detailDescriptionData?.length
          ? detailDescriptionData?.map((data, jindex: number) => (
              <Fragment key={jindex}>
                <h2
                  className={styles.title}
                  dangerouslySetInnerHTML={{ __html: data.title }}
                  style={{ marginBottom: "-1em" }}
                ></h2>
                <div className={styles.images}>
                  {data?.images1?.map((img, f) => (
                    <img
                      key={f}
                      className={styles.image}
                      src={img}
                      alt={`image_detail${f}`}
                    />
                  ))}
                </div>
                <div className={styles.dataAfterTable}>
                  {data?.content?.map((d, k) => (
                    <p key={k} dangerouslySetInnerHTML={{ __html: d }}></p>
                  ))}
                </div>
                {data?.table?.length ? (
                  <TableContainer className={styles.productDetailTable}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className={styles.thead}>
                        <TableRow>
                          {Object.values(data?.table[0])?.map(
                            (col: any, index: number) => (
                              <TableCell
                                key={index}
                                className={styles.tcell}
                                align="center"
                              >
                                {col}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody className={styles.tbody}>
                        {data?.table?.slice(1).map((row: any, i: number) => (
                          <TableRow
                            className={styles.trowd}
                            key={i}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            {Object.values(row)?.map(
                              (val: any, ind: number) => {
                                if (typeof val === "object") {
                                  return Object.values(val)?.map(
                                    (value: any, indi: number) => (
                                      <TableCell
                                        key={indi}
                                        className={styles.tcelld}
                                        align="center"
                                      >
                                        {value}
                                      </TableCell>
                                    )
                                  );
                                }
                                return (
                                  <TableCell
                                    key={ind}
                                    className={styles.tcelld}
                                    align="center"
                                  >
                                    {val}
                                  </TableCell>
                                );
                              }
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
                <div className={styles.images2}>
                  {data?.images2?.map((img, f) => (
                    <img
                      key={f}
                      className={styles.image2}
                      src={img}
                      alt={`image_detail2${f}`}
                    />
                  ))}
                </div>
                <div className={styles.dataAfterTable}>
                  {data?.DataAfterTable?.map((d, k) => (
                    <p key={k} dangerouslySetInnerHTML={{ __html: d }}></p>
                  ))}
                </div>
                {data?.downloadFile && data?.downloadFile !== "" ? (
                  <div className={styles.downloadDatasheet}>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => {
                        window.open("/uploads/" + data?.downloadFile, "_blank");
                      }}
                    >
                      Download Datasheet
                    </button>
                  </div>
                ) : null}
              </Fragment>
            ))
          : null}
      </div>
    );
  }
}

export default connect((state: IStore) => ({
  detailDescriptionData: getProductDetailDescriptionAfterTable(state),
}))(DetailDescriptionAfterTable);

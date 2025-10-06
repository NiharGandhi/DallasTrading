import { Component, ReactNode } from "react";
import styles from "./productDetailTable.module.scss";
import {
  IProductDetailTableProps,
  IProductDetailTableStates,
} from "./productDetailTable.constants";
import { connect } from "react-redux";
import { IStore } from "../../../utils/models/store.model";
import { getProductDetailTableData } from "../../../store/product-detail/productDetailActions";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

class ProductDetailTable extends Component<
  IProductDetailTableProps,
  IProductDetailTableStates
> {
  render(): ReactNode {
    return (
      <TableContainer className={styles.productDetailTable}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.thead}>
            {this.props.productDetailTable?.productDetailTableColumns?.map(
              (cols: any, index: number) => (
                <TableRow key={index}>
                  {cols?.map((col: any) => (
                    <TableCell
                      className={styles.tcell}
                      align="center"
                      key={col?.id}
                      colSpan={col?.colSpan}
                      style={{
                        width: col?.customeWidth ? col?.customeWidth : "100",
                      }}
                    >
                      {col?.name}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )}
          </TableHead>
          <TableBody className={styles.tbody}>
            {this.props.productDetailTable?.productDetailTableData?.map(
              (row: any, i: number) => (
                <TableRow
                  className={styles.trowd}
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.values(row)?.map((val: any, ind: number) => {
                    if (typeof val === "object") {
                      return Object.values(val)?.map(
                        (value: any, ind: number) => (
                          <TableCell
                            key={ind}
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
                  })}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default connect((state: IStore) => ({
  productDetailTable: getProductDetailTableData(state),
}))(ProductDetailTable);

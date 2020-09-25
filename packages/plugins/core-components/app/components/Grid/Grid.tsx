import { Component, h, Host, Prop } from "@stencil/core";
import { computeStyle } from "../../utils/computeStyle";
import { Style } from "../../helpers/Style";
import type { GridType } from "./types";

@Component({
  tag: "corejam-grid",
  shadow: true,
})
export class Grid {
  @Prop() templateColumns: GridType.TemplateColumns;
  @Prop() smTemplateColumns: GridType.TemplateColumns;
  @Prop() mdTemplateColumns: GridType.TemplateColumns;
  @Prop() lgTemplateColumns: GridType.TemplateColumns;
  @Prop() xlTemplateColumns: GridType.TemplateColumns;
  @Prop() templateRows: GridType.TemplateRows;
  @Prop() smTemplateRows: GridType.TemplateRows;
  @Prop() mdTemplateRows: GridType.TemplateRows;
  @Prop() lgTemplateRows: GridType.TemplateRows;
  @Prop() xlTemplateRows: GridType.TemplateRows;
  @Prop() cols: GridType.Cols;
  @Prop() smCols: GridType.Cols;
  @Prop() mdCols: GridType.Cols;
  @Prop() lgCols: GridType.Cols;
  @Prop() xlCols: GridType.Cols;
  @Prop() colsStart: GridType.ColsStart;
  @Prop() smColsStart: GridType.ColsStart;
  @Prop() mdColsStart: GridType.ColsStart;
  @Prop() lgColsStart: GridType.ColsStart;
  @Prop() xlColsStart: GridType.ColsStart;
  @Prop() colsEnd: GridType.ColsEnd;
  @Prop() smColsEnd: GridType.ColsEnd;
  @Prop() mdColsEnd: GridType.ColsEnd;
  @Prop() lgColsEnd: GridType.ColsEnd;
  @Prop() xlColsEnd: GridType.ColsEnd;
  @Prop() rows: GridType.Rows;
  @Prop() smRows: GridType.Rows;
  @Prop() mdRows: GridType.Rows;
  @Prop() lgRows: GridType.Rows;
  @Prop() xlRows: GridType.Rows;
  @Prop() rowsStart: GridType.RowsStart;
  @Prop() smRowsStart: GridType.RowsStart;
  @Prop() mdRowsStart: GridType.RowsStart;
  @Prop() lgRowsStart: GridType.RowsStart;
  @Prop() xlRowsStart: GridType.RowsStart;
  @Prop() rowsEnd: GridType.RowsEnd;
  @Prop() smRowsEnd: GridType.RowsEnd;
  @Prop() mdRowsEnd: GridType.RowsEnd;
  @Prop() lgRowsEnd: GridType.RowsEnd;
  @Prop() xlRowsEnd: GridType.RowsEnd;
  @Prop() gap: GridType.Gap;
  @Prop() smGap: GridType.Gap;
  @Prop() mdGap: GridType.Gap;
  @Prop() lgGap: GridType.Gap;
  @Prop() xlGap: GridType.Gap;
  @Prop() gapCol: GridType.Gap;
  @Prop() smGapCol: GridType.Gap;
  @Prop() mdGapCol: GridType.Gap;
  @Prop() lgGapCol: GridType.Gap;
  @Prop() xlGapCol: GridType.Gap;
  @Prop() gapRow: GridType.Gap;
  @Prop() smGapRow: GridType.Gap;
  @Prop() mdGapRow: GridType.Gap;
  @Prop() lgGapRow: GridType.Gap;
  @Prop() xlGapRow: GridType.Gap;
  @Prop() autoFlow: GridType.Flow;
  @Prop() smAutoFlow: GridType.Flow;
  @Prop() mdAutoFlow: GridType.Flow;
  @Prop() lgAutoFlow: GridType.Flow;
  @Prop() xlAutoFlow: GridType.Flow;
  @Prop() grid: Boolean = true;

  private hash: string;
  private computedStyle: string;

  async componentWillLoad() {
    const rules = (await import("../../utils/style")).generateStyleMap(this, "");
    const [hash, style] = computeStyle(rules, true);
    this.hash = hash;
    this.computedStyle = style;
  }

  _relevantProps = [
    "templateColumns",
    "smTemplateColumns",
    "mdTemplateColumns",
    "lgTemplateColumns",
    "xlTemplateColumns",
    "templateRows",
    "smTemplateRows",
    "mdTemplateRows",
    "lgTemplateRows",
    "xlTemplateRows",
    "cols",
    "smCols",
    "mdCols",
    "lgCols",
    "xlCols",
    "colsStart",
    "smColsStart",
    "mdColsStart",
    "lgColsStart",
    "xlColsStart",
    "colsEnd",
    "smColsEnd",
    "mdColsEnd",
    "lgColsEnd",
    "xlColsEnd",
    "rows",
    "smRows",
    "mdRows",
    "lgRows",
    "xlRows",
    "rowsStart",
    "smRowsStart",
    "mdRowsStart",
    "lgRowsStart",
    "xlRowsStart",
    "rowsEnd",
    "smRowsEnd",
    "mdRowsEnd",
    "lgRowsEnd",
    "xlRowsEnd",
    "gap",
    "smGap",
    "mdGap",
    "lgGap",
    "xlGap",
    "gapCol",
    "smGapCol",
    "mdGapCol",
    "lgGapCol",
    "xlGapCol",
    "gapRow",
    "smGapRow",
    "mdGapRow",
    "lgGapRow",
    "xlGapRow",
    "autoFlow",
    "smAutoFlow",
    "mdAutoFlow",
    "lgAutoFlow",
    "xlAutoFlow",
    "grid",
  ];

  render() {
    return (
      <Host class={this.hash}>
        <slot></slot>
        {this.hash && <Style styles={this.computedStyle} hash={this.hash} />}
      </Host>
    );
  }
}

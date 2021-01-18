import { Component, h, Host, Prop, State } from "@stencil/core";
import type { GridType } from "./types";

@Component({
  tag: "corejam-grid",
})
export class Grid {
  @Prop({ reflect: true }) templateColumns: GridType.TemplateColumns;
  @Prop({ reflect: true }) smTemplateColumns: GridType.TemplateColumns;
  @Prop({ reflect: true }) mdTemplateColumns: GridType.TemplateColumns;
  @Prop({ reflect: true }) lgTemplateColumns: GridType.TemplateColumns;
  @Prop({ reflect: true }) xlTemplateColumns: GridType.TemplateColumns;
  @Prop({ reflect: true }) templateRows: GridType.TemplateRows;
  @Prop({ reflect: true }) smTemplateRows: GridType.TemplateRows;
  @Prop({ reflect: true }) mdTemplateRows: GridType.TemplateRows;
  @Prop({ reflect: true }) lgTemplateRows: GridType.TemplateRows;
  @Prop({ reflect: true }) xlTemplateRows: GridType.TemplateRows;
  @Prop({ reflect: true }) cols: GridType.Cols;
  @Prop({ reflect: true }) smCols: GridType.Cols;
  @Prop({ reflect: true }) mdCols: GridType.Cols;
  @Prop({ reflect: true }) lgCols: GridType.Cols;
  @Prop({ reflect: true }) xlCols: GridType.Cols;
  @Prop({ reflect: true }) colsStart: GridType.ColsStart;
  @Prop({ reflect: true }) smColsStart: GridType.ColsStart;
  @Prop({ reflect: true }) mdColsStart: GridType.ColsStart;
  @Prop({ reflect: true }) lgColsStart: GridType.ColsStart;
  @Prop({ reflect: true }) xlColsStart: GridType.ColsStart;
  @Prop({ reflect: true }) colsEnd: GridType.ColsEnd;
  @Prop({ reflect: true }) smColsEnd: GridType.ColsEnd;
  @Prop({ reflect: true }) mdColsEnd: GridType.ColsEnd;
  @Prop({ reflect: true }) lgColsEnd: GridType.ColsEnd;
  @Prop({ reflect: true }) xlColsEnd: GridType.ColsEnd;
  @Prop({ reflect: true }) rows: GridType.Rows;
  @Prop({ reflect: true }) smRows: GridType.Rows;
  @Prop({ reflect: true }) mdRows: GridType.Rows;
  @Prop({ reflect: true }) lgRows: GridType.Rows;
  @Prop({ reflect: true }) xlRows: GridType.Rows;
  @Prop({ reflect: true }) rowsStart: GridType.RowsStart;
  @Prop({ reflect: true }) smRowsStart: GridType.RowsStart;
  @Prop({ reflect: true }) mdRowsStart: GridType.RowsStart;
  @Prop({ reflect: true }) lgRowsStart: GridType.RowsStart;
  @Prop({ reflect: true }) xlRowsStart: GridType.RowsStart;
  @Prop({ reflect: true }) rowsEnd: GridType.RowsEnd;
  @Prop({ reflect: true }) smRowsEnd: GridType.RowsEnd;
  @Prop({ reflect: true }) mdRowsEnd: GridType.RowsEnd;
  @Prop({ reflect: true }) lgRowsEnd: GridType.RowsEnd;
  @Prop({ reflect: true }) xlRowsEnd: GridType.RowsEnd;
  @Prop({ reflect: true }) gap: GridType.Gap;
  @Prop({ reflect: true }) smGap: GridType.Gap;
  @Prop({ reflect: true }) mdGap: GridType.Gap;
  @Prop({ reflect: true }) lgGap: GridType.Gap;
  @Prop({ reflect: true }) xlGap: GridType.Gap;
  @Prop({ reflect: true }) gapCol: GridType.Gap;
  @Prop({ reflect: true }) smGapCol: GridType.Gap;
  @Prop({ reflect: true }) mdGapCol: GridType.Gap;
  @Prop({ reflect: true }) lgGapCol: GridType.Gap;
  @Prop({ reflect: true }) xlGapCol: GridType.Gap;
  @Prop({ reflect: true }) gapRow: GridType.Gap;
  @Prop({ reflect: true }) smGapRow: GridType.Gap;
  @Prop({ reflect: true }) mdGapRow: GridType.Gap;
  @Prop({ reflect: true }) lgGapRow: GridType.Gap;
  @Prop({ reflect: true }) xlGapRow: GridType.Gap;
  @Prop({ reflect: true }) autoFlow: GridType.Flow;
  @Prop({ reflect: true }) smAutoFlow: GridType.Flow;
  @Prop({ reflect: true }) mdAutoFlow: GridType.Flow;
  @Prop({ reflect: true }) lgAutoFlow: GridType.Flow;
  @Prop({ reflect: true }) xlAutoFlow: GridType.Flow;
  @Prop({ reflect: true }) grid: Boolean = true;
  @Prop({ reflect: true }) h: String;
  @State() hash: string;

  async componentWillLoad() {
    await this.computeStyles();
  }

  componentShouldUpdate(newValue, oldValue) {
    return newValue != oldValue;
  }

  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
  }

  render() {
    return (
      <Host class={this.hash}>
        <slot></slot>
      </Host>
    );
  }
}

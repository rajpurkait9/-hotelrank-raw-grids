import MDSCheckbox from "../chakra-compo/CheckBox";
import MDSDateRangePicker from "../chakra-compo/DateComponent/DateRangeSelector";
import MDSDatePicker from "../chakra-compo/DateComponent/DateSelector";
import MDSInput from "../chakra-compo/Input";
import MDSSelectBox from "../chakra-compo/SelectBox";
import { IFilterConfig } from "./FilterTypes";

export const RenderFilter = (filter: IFilterConfig, drawerOpen?: boolean) => {
  if (filter.customComponent) {
    return filter.customComponent;
  }

  switch (filter.type) {
    case "text":
      return (
        <MDSInput
          placeholder={filter.label}
          value={filter.value as string}
          onChange={filter.onChange}
          label={filter.label}
          visible={drawerOpen}
        />
      );

    case "number":
      return (
        <MDSInput
          label={filter.label}
          value={filter.value as number}
          onChange={filter.onChange}
        />
      );

    case "checkbox":
      return (
        <MDSCheckbox
          label={filter.label}
          value={filter.value as boolean}
          onChange={filter.onChange}
        />
      );

    case "select":
      return (
        <MDSSelectBox
          label={filter.label}
          value={filter.value as string}
          onChange={filter.onChange}
          options={filter.options ?? []}
          visible={drawerOpen}
          placeholder={filter.placeholder}
        />
      );

    case "date":
      return (
        // <DateRangeFilter
        //   value={filter.value as string}
        //   onChange={filter.onChange as (v: string | undefined) => void}
        // />
        <MDSDatePicker
          value={filter.value as Date}
          onChange={filter.onChange as (v: string | Date | null) => void}
          visible={drawerOpen}
          label={filter.label}
        />
      );

    case "date-range":
      return (
        <MDSDateRangePicker
          startDate={filter.startDate ? new Date(filter.startDate) : undefined}
          endDate={filter.endDate ? new Date(filter.endDate) : undefined}
          onChange={
            filter.onChange as (v: string | Date | null | undefined) => void
          }
          visible={drawerOpen}
          label={filter.label}
        />
      );

    case "combobox":
      return (
        // <MDSCombobox
        //   visible={true}
        //   label={filter.label}
        //   // value={filter.value }
        //   // items={filter.options?.map((item) => ({
        //   //   ...item,
        //   //   label: String(item.label),
        //   // }))}
        //   itemToString={(i) => String(i.label)}
        //   itemToValue={(i: { value: string }) => i.value}
        //   renderItem={(item: { label: string; value: string }) => <span>{item.label}</span>}
        // />
        <></>
      );

    default:
      return null;
  }
};
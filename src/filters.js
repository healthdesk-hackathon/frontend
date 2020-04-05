import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("date", value => {
  try {
    return dayjs(value).format("YYYY-MM-DD");
  } catch {
    return value;
  }
});

Vue.filter("datetime", value => {
  try {
    return dayjs(value).format("YYYY-MM-DD [at] HH:mm");
  } catch {
    return value;
  }
});

Vue.filter("time", value => {
  try {
    return dayjs(value).format("HH:mm");
  } catch {
    return value;
  }
});

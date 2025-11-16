
export interface WorshipOrderItem {
  item: string;
  subitem?: string;
  person?: string;
  subperson?: string;
}

export interface NewsItem {
  date: string;
  event: string;
}

export interface FinanceReportItem {
  item: string;
  amount: string;
}

export interface MissionaryItem {
  country: string;
  names: string;
}

export interface WeeklyScheduleItem {
  date: string;
  prayer: string;
  sermon: string;
}

export interface BulletinData {
  main: {
    issue: string;
    date: string;
    time: string;
  };
  about: {
    title: string;
    body: string;
  };
  worshipOrder: WorshipOrderItem[];
  hymn: {
    title: string;
    musicSheet: string | null;
  };
  news: {
    title: string;
    items: NewsItem[];
  };
  finance: {
    reports: FinanceReportItem[];
    account: {
      bank: string;
      number: string;
      holder: string;
    };
  };
  missionaries: {
    title: string;
    quote: string;
    items: MissionaryItem[];
  };
  schedule: {
    title: string;
    weekly: WeeklyScheduleItem[];
    prayerList: string;
    sermonList: string;
  };
}

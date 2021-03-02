export type Media = {
  description: string;
  isAttached: boolean;
  label: string;
  name: string;
};

export type WebsocketStateResponse = {
  media: {
    description: string;
    is_attached: boolean;
    label: string;
    name: string;
  }[];
  motd_lines: string[];
};

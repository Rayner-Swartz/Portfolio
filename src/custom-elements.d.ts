declare namespace JSX {
  interface IntrinsicElements {
    "langflow-chat": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      window_title?: string;
      flow_id?: string;
      host_url?: string;
      api_key?: string;
    };
  }
}
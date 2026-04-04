export type TUserMessageBoxProps = {
  message: string;
};

export function UserMessageBox(props: TUserMessageBoxProps) {
  const { message } = props;
  return (
    <div className="flex justify-end">
      <div className="max-w-sm flex-1 p-3 bg-primary text-primary-foreground rounded-2xl">
        {message}
      </div>
    </div>
  );
}

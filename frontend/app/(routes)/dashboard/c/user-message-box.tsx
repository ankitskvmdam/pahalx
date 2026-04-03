export type TUserMessageBoxProps = {
  message: string;
};

export function UserMessageBox(props: TUserMessageBoxProps) {
  const { message } = props;
  return (
    <div className="flex justify-end">
      <div className="max-w-sm p-3 bg-accent text-background rounded-2xl">
        {message}
      </div>
    </div>
  );
}

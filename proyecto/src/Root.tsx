import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Video"
      component={Video}
      durationInFrames={1019}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

import { buildInfo } from '../buildInfo';

export function AboutBuild() {
  return (
    <div style={{ fontSize: 12, opacity: 0.8 }}>
      <div>
        <strong>Version:</strong> {buildInfo.version}
      </div>
      <div>
        <strong>Commit:</strong> {buildInfo.commit}
      </div>
      <div>
        <strong>Built:</strong> {new Date(buildInfo.buildTime).toLocaleString()}
      </div>
    </div>
  );
}

export enum FileStatus {
  /**
   * 初始状态
   */
  inited,
  /**
   *  已经进入队列, 等待上传
   */
  queued,
  /**
   * 上传中
   */
  progress,
  /**
   * 上传完成。
   */
  complete,
  /**
   * 上传出错，可重试
   */
  error,
  /**
   * 上传中断，可续传。
   */
  interrupt,
  /**
   * 文件不合格，不能重试上传。会自动从队列中移除。
   */
  invalid,
  /**
   * 文件被移除。
   */
  cancelled
}

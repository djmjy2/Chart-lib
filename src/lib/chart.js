import template from './chart.template';

const defaultOption = {
  percent: 0,
  duration: 1000,
  frame: 30,
}

/**
 * Chart 클래스
 */
class Chart {
  #template = template;
  #el;
  #percent;
  #duration;
  #label;
  #frame;
  #handle;

  /**
   * 
   * @param {string} container - 마운트 될 DOM 컨테이너 셀렉터
   * @param {string} data - 옵션 데이터 duration, frame
   * @example
   * new Chart('#root', {
   *    duration: 2000,
   *    frame: 20,
   * });
   */

  constructor( container, data ) {
    const { duration, frame, percent} = {...defaultOption, data};

    this.#duration = duration;
    this.#frame = frame;
    this.#percent = percent;

    this.#el = document.querySelector(container);
  }

  /**
   * 퍼센트를 설정합니다.
   */
  set percent(per) {
    this.#percent = per;
  }

  /**
   * 애니메이션 시간을 설정합니다. 단위: ms
   */
  set duration(der) {
    this.#duration = der;
  }

  /**
   * 애니메이션의 초당 프레임을 설정합니다.
   */
  set frame(fr) {
    this.#frame = fr;
  }

  set label(text) {
    this.#label = text;
  }

  /**
   * 소스 데이터를 설정합니다.
   * @param { Array } source - 2차원 배열
   */
  setDataSource(source) {

  }

  /**
   * UI 업데이트를 수행합니다.
   */
  render() {
    this.#el.innerHTML = this.#template({
      percent: this.#percent * 10,
      duration: `${this.#duration / 1000}s`,
      label: this.#label,
    });

    const maxLoop = Math.floor(this.#duration / (100/this.#frame));
    let loopCount = 0;

    this.#handle = setInterval(() => {
      loopCount++

      this.#el.querySelector('#progress').innerHTML
        = loopCount > maxLoop ? `${this.#percent}%` : `${Math.floor(this.#percent / maxLoop) * loopCount}%`;

      if (loopCount > maxLoop) {
        clearInterval(this.#handle);
      }
    }, 1000/this.#frame);
  }
}

export default Chart;
import {
  Field,
  Slider as FuiSlider,
  SliderProps as FuiSliderProps,
  Tooltip,
  mergeClasses,
} from '@fluentui/react-components';
import { SliderProps } from './types';
import {
  useMileStoneBaseStyles,
  useMileStoneIconBaseStyles,
  useMileStoneStyles,
  useMileStoneValueBaseStyles,
  useSliderBaseStyles,
  useSliderWrapperBaseStyles,
} from './style';
import { useMemo, useState } from 'react';

export const Slider = ({
  label,
  size,
  error,
  required,
  value,
  onChange,
  milestone,
  showMilestoneValue,
  ...restProps
}: SliderProps) => {
  const sliderWrapperBaseClassName = useSliderWrapperBaseStyles();
  const sliderBaseClassName = useSliderBaseStyles();
  const mileStoneBaseClassName = useMileStoneBaseStyles();
  const mileStoneIconBaseClassName = useMileStoneIconBaseStyles();
  const mileStoneValueBaseClassName = useMileStoneValueBaseStyles();
  const mileStoneClassNames = useMileStoneStyles();

  const [tooltipTargetRef, setTooltipTargetRef] = useState<HTMLDivElement | null>(null);

  const handleChange: FuiSliderProps['onChange'] = (_, data) => {
    onChange && onChange(data.value);
  };

  const masks = useMemo(() => {
    const { min, max } = restProps;
    if ((min !== 0 && !min) || !max || !milestone) return {};

    const range = max - min + 1;
    return new Array(milestone).fill(0).reduce<Record<number, number>>((acc, _, index) => {
      const percent = (index + 1) / (Number(milestone) + 1);
      const tickValue = Number(Number(range * percent).toFixed(0));
      acc[percent * 100] = tickValue;
      return acc;
    }, {});
  }, [milestone]);

  return (
    <Field
      label={label}
      required={required}
      size={size}
      {...(Boolean(error)
        ? {
            validationState: 'error',
            validationMessage: error,
          }
        : {})}
    >
      <div className={sliderWrapperBaseClassName}>
        <span className={mileStoneClassNames.highlightedValue}>{restProps.min}</span>
        <div className={sliderBaseClassName}>
          <Tooltip
            content={value || 0}
            relationship='description'
            appearance='inverted'
            withArrow
            positioning={{
              target: tooltipTargetRef,
            }}
          >
            <FuiSlider
              size='small'
              {...restProps}
              value={value}
              onChange={handleChange}
              thumb={{
                ref: (ref) => {
                  setTooltipTargetRef(ref);
                },
              }}
              rail={{
                children: Object.keys(masks).map((m) => {
                  const isHighlighted = Number(value || 0) >= masks[Number(m)];

                  return (
                    <div
                      key={m}
                      className={mileStoneBaseClassName}
                      style={{ left: m + '%' }}
                    >
                      <span
                        className={mergeClasses(
                          mileStoneIconBaseClassName,
                          isHighlighted && mileStoneClassNames.highlightedIcon,
                        )}
                      ></span>
                      <span
                        className={mergeClasses(
                          mileStoneValueBaseClassName,
                          !showMilestoneValue && mileStoneClassNames.unShowValue,
                          showMilestoneValue && mileStoneClassNames.showValue,
                          isHighlighted && mileStoneClassNames.highlightedValue,
                        )}
                      >
                        {masks[Number(m)]}
                      </span>
                    </div>
                  );
                }),
              }}
            />
          </Tooltip>
        </div>
        <span
          className={mergeClasses(
            Number(value || 0) === restProps.max && mileStoneClassNames.highlightedValue,
          )}
        >
          {restProps.max}
        </span>
      </div>
    </Field>
  );
};

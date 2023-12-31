// import React, { cloneElement, forwardRef } from "react";
// import AsyncReactSelect from "react-select/async";
// import CreatableReactSelect from "react-select/creatable";
// import ReactSelect, { components as selectComponents } from "react-select";
// import {
// 	Flex,
// 	Tag,
// 	TagCloseButton,
// 	TagLabel,
// 	Divider,
// 	CloseButton,
// 	Center,
// 	Box,
// 	Portal,
// 	StylesProvider,
// 	useMultiStyleConfig,
// 	useStyles,
// 	useTheme,
// 	useColorModeValue,
// 	createIcon,
// } from "@chakra-ui/react";

// const ChevronDown = createIcon({
// 	displayName: "ChevronDownIcon",
// 	viewBox: "0 -2 24 24",
// 	d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
// });

// // Custom styles for components which do not have a chakra equivalent
// const chakraStyles = {
// 	input: (provided) => ({
// 		...provided,
// 		color: "inherit",
// 		lineHeight: 1,
// 		marginLeft: 0,
// 	}),
// 	menu: (provided) => ({
// 		...provided,
// 		boxShadow: "none",
// 		zIndex: 99,
// 	}),
// 	valueContainer: (provided, { selectProps: { size, isDisabled } }) => {
// 		const opacity = isDisabled && 1;
// 		const transition = "opacity 300ms";
// 		const px = {
// 			sm: "0.75rem",
// 			md: "1rem",
// 			lg: "1rem",
// 		};

// 		return {
// 			...provided,
// 			opacity,
// 			transition,
// 			padding: `0 ${px[size]}`,
// 		};
// 	},
// 	singleValue: (provided, { selectProps: { isDisabled } }) => {
// 		return {
// 			...provided,
// 			color: isDisabled && "inherit",
// 			marginLeft: 0,
// 		};
// 	},
// 	placeholder: (provided) => {
// 		return {
// 			...provided,
// 			marginLeft: 0,
// 		};
// 	},
// 	loadingMessage: (provided, { selectProps: { size } }) => {
// 		const fontSizes = {
// 			sm: "0.875rem",
// 			md: "1rem",
// 			lg: "1.125rem",
// 		};

// 		const paddings = {
// 			sm: "6px 9px",
// 			md: "8px 12px",
// 			lg: "10px 15px",
// 		};

// 		return {
// 			...provided,
// 			fontSize: fontSizes[size],
// 			padding: paddings[size],
// 		};
// 	},
// 	// Add the chakra style for when a TagCloseButton has focus
// 	multiValueRemove: (provided, { isFocused, selectProps: { multiValueRemoveFocusStyle } }) => (isFocused ? multiValueRemoveFocusStyle : {}),
// 	control: () => ({}),
// 	menuList: () => ({}),
// 	option: () => ({}),
// 	multiValue: () => ({}),
// 	multiValueLabel: () => ({}),
// 	group: () => ({}),
// };

// const chakraComponents = {
// 	// Control components
// 	Control: ({ children, innerRef, innerProps, isDisabled, isFocused, selectProps: { size } }) => {
// 		const opacity = isDisabled && 1;
// 		const inputStyles = useMultiStyleConfig("Input", { size });

// 		const heights = {
// 			sm: 8,
// 			md: 10,
// 			lg: 12,
// 		};

// 		return (
// 			<StylesProvider value={inputStyles}>
// 				<Flex
// 					ref={innerRef}
// 					sx={{
// 						...inputStyles.field,
// 						p: 0,
// 						overflow: "hidden",
// 						h: "auto",
// 						minH: heights[size],
// 						opacity: opacity,
// 					}}
// 					{...innerProps}
// 					{...(isFocused && { "data-focus": true })}
// 					// {...(isDisabled && { disabled: true })}
// 				>
// 					{children}
// 				</Flex>
// 			</StylesProvider>
// 		);
// 	},
// 	MultiValueContainer: ({ children, innerRef, innerProps, data, selectProps }) => (
// 		<Tag
// 			ref={innerRef}
// 			{...innerProps}
// 			m="0.125rem"
// 			// react-select Fixed Options example: https://react-select.com/home#fixed-options
// 			variant={data.isFixed ? "solid" : "subtle"}
// 			colorScheme={data.colorScheme || selectProps.colorScheme}
// 			size={selectProps.size}
// 		>
// 			{children}
// 		</Tag>
// 	),
// 	MultiValueLabel: ({ children, innerRef, innerProps }) => (
// 		<TagLabel ref={innerRef} {...innerProps}>
// 			{children}
// 		</TagLabel>
// 	),
// 	MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
// 		if (isFixed) {
// 			return null;
// 		}

// 		return (
// 			<TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
// 				{children}
// 			</TagCloseButton>
// 		);
// 	},
// 	IndicatorSeparator: ({ innerProps }) => <Divider d="none" {...innerProps} orientation="vertical" opacity="1" />,
// 	ClearIndicator: ({ innerProps, selectProps: { size } }) => <CloseButton {...innerProps} size="sm" mx={2} tabIndex={-1} />,
// 	DropdownIndicator: ({ innerProps, selectProps: { size } }) => {
// 		const { addon } = useStyles();

// 		const iconSizes = {
// 			sm: 4,
// 			md: 5,
// 			lg: 6,
// 		};
// 		const iconSize = iconSizes[size];

// 		return (
// 			<Center
// 				{...innerProps}
// 				w="1rem"
// 				sx={{
// 					...addon,
// 					h: "100%",
// 					borderRadius: 0,
// 					borderWidth: 0,
// 					cursor: "pointer",
// 					background: "white",
// 				}}
// 			>
// 				<ChevronDown h={iconSize} w={iconSize} />
// 			</Center>
// 		);
// 	},
// 	// Menu components
// 	MenuPortal: ({ children }) => <Portal>{children}</Portal>,
// 	Menu: ({ children, ...props }) => {
// 		const menuStyles = useMultiStyleConfig("Menu");
// 		return (
// 			<selectComponents.Menu {...props}>
// 				<StylesProvider value={menuStyles}>{children}</StylesProvider>
// 			</selectComponents.Menu>
// 		);
// 	},
// 	MenuList: ({ innerRef, children, maxHeight, selectProps: { size } }) => {
// 		const { list } = useStyles();
// 		const chakraTheme = useTheme();

// 		const borderRadii = {
// 			sm: chakraTheme.radii.sm,
// 			md: chakraTheme.radii.md,
// 			lg: chakraTheme.radii.md,
// 		};

// 		return (
// 			<Box
// 				sx={{
// 					...list,
// 					maxH: `${maxHeight}px`,
// 					overflowY: "auto",
// 					borderRadius: borderRadii[size],
// 				}}
// 				ref={innerRef}
// 			>
// 				{children}
// 			</Box>
// 		);
// 	},
// 	GroupHeading: ({ innerProps, children }) => {
// 		const { groupTitle } = useStyles();
// 		return (
// 			<Box sx={groupTitle} {...innerProps}>
// 				{children}
// 			</Box>
// 		);
// 	},
// 	Option: ({ innerRef, innerProps, children, isFocused, isDisabled, selectProps: { size } }) => {
// 		const { item } = useStyles();
// 		return (
// 			<Box
// 				role="button"
// 				sx={{
// 					...item,
// 					w: "100%",
// 					textAlign: "left",
// 					bg: isFocused ? item._focus.bg : "transparent",
// 					fontSize: size,
// 					...(isDisabled && item._disabled),
// 				}}
// 				ref={innerRef}
// 				{...innerProps}
// 				{...(isDisabled && { disabled: true })}
// 			>
// 				{children}
// 			</Box>
// 		);
// 	},
// };

// const ChakraReactSelect = ({ children, styles = {}, components = {}, theme = () => ({}), size = "md", colorScheme = "gray", ...props }) => {
// 	const chakraTheme = useTheme();

// 	// The chakra theme styles for TagCloseButton when focused
// 	const closeButtonFocus = chakraTheme.components.Tag.baseStyle.closeButton._focus;
// 	const multiValueRemoveFocusStyle = {
// 		background: closeButtonFocus.bg,
// 		boxShadow: chakraTheme.shadows[closeButtonFocus.boxShadow],
// 	};

// 	// The chakra UI global placeholder color
// 	// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
// 	const placeholderColor = useColorModeValue(chakraTheme.colors.gray[400], chakraTheme.colors.whiteAlpha[400]);

// 	// Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
// 	let realSize = size;
// 	const sizeOptions = ["sm", "md", "lg"];
// 	if (!sizeOptions.includes(size)) {
// 		realSize = "md";
// 	}

// 	const select = cloneElement(children, {
// 		components: {
// 			...chakraComponents,
// 			...components,
// 		},
// 		styles: {
// 			...chakraStyles,
// 			...styles,
// 		},
// 		theme: (baseTheme) => {
// 			const propTheme = theme(baseTheme);

// 			return {
// 				...baseTheme,
// 				...propTheme,
// 				colors: {
// 					...baseTheme.colors,
// 					neutral50: placeholderColor, // placeholder text color
// 					neutral40: placeholderColor, // noOptionsMessage color
// 					...propTheme.colors,
// 				},
// 				spacing: {
// 					...baseTheme.spacing,
// 					...propTheme.spacing,
// 				},
// 			};
// 		},
// 		colorScheme,
// 		size: realSize,
// 		multiValueRemoveFocusStyle,
// 		...props,
// 	});

// 	return select;
// };

// const Select = forwardRef((props, ref) => (
// 	<ChakraReactSelect {...props}>
// 		<ReactSelect ref={ref} />
// 	</ChakraReactSelect>
// ));

// const AsyncSelect = forwardRef((props, ref) => (
// 	<ChakraReactSelect {...props}>
// 		<AsyncReactSelect ref={ref} />
// 	</ChakraReactSelect>
// ));

// const CreatableSelect = forwardRef((props, ref) => (
// 	<ChakraReactSelect {...props}>
// 		<CreatableReactSelect ref={ref} />
// 	</ChakraReactSelect>
// ));

// export { Select as default, AsyncSelect, CreatableSelect };

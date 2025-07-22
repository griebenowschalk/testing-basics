import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useArray } from "../components/Hooks/UseArray";

describe("UseArrayExample Test Suite", () => {
  describe("UserArray with numbers", () => {
    it("should render the initial array", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const { result } = renderHook(() => useArray(initialArray));
      expect(result.current.array).toEqual(initialArray);
    });

    it("should add a number to the array", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const { result } = renderHook(() => useArray(initialArray));
      act(() => {
        result.current.push(7);
      });
      expect(result.current.array).toEqual([...initialArray, 7]);
    });

    it("should remove a number from the array", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const { result } = renderHook(() => useArray(initialArray));
      act(() => {
        result.current.remove(1);
      });
      expect(result.current.array[1]).toEqual(3);
      expect(result.current.array).toHaveLength(5);
      expect(result.current.array).not.toContain(2);
    });

    it("should update a number in the array", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const { result } = renderHook(() => useArray(initialArray));
      act(() => {
        result.current.update(1, 8);
      });
      expect(result.current.array[1]).toEqual(8);
    });

    it("should filter the array", () => {
      const initialArray = [1, 2, 3, 4, 5, 6];
      const { result } = renderHook(() => useArray(initialArray));
      act(() => {
        result.current.filter((n) => n < 5);
      });
      expect(result.current.array).toEqual([1, 2, 3, 4]);
      expect(result.current.array).toHaveLength(4);
      expect(result.current.array).not.toContain(5);
      expect(result.current.array).not.toContain(6);
    });
  });

  describe("UserArray with strings", () => {
    it("should render the initial array", () => {
      const initialArray = ["apple", "banana", "cherry", "date", "elderberry"];
      const { result } = renderHook(() => useArray(initialArray));
      expect(result.current.array).toEqual(initialArray);
    });

    it("should remove a string from the array - elements that do not start with Uppercase", () => {
        const initialArray = ['A', 'B', 'apple', 'cherry'];
        const { result } = renderHook(() => useArray(initialArray));
        act(() => {
            result.current.filter((n) => n[0] === n[0].toLowerCase())
        })
        expect(result.current.array).toEqual(['apple', 'cherry']);
        expect(result.current.array).toHaveLength(2);
        expect(result.current.array).not.toContain('A');
        expect(result.current.array).not.toContain('B');
    })
  });
});

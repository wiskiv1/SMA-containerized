"use client";
/**
 * @author Witse Panneels
 */
import type { Product } from "@/src/types/SMA_objects";
import type { productsResponse } from "@/src/types/SMA_networking";
import { useEffect, useState } from "react";

export default function ParamSettings() {
  return (
    <table className="params-table">
      <thead className="products-table-head">
        <tr>
          <th colSpan={2}>Params</th>
          <th colSpan={4}>Value</th>
          <th colSpan={2}>Actions</th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr>
          <th>Trigram</th>
          <th>Name</th>
          <th>Default</th>
          <th>Crash</th>
          <th>Min</th>
          <th>Max</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </tbody>
    </table>
  );
}

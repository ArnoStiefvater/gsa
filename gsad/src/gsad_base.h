/* Copyright (C) 2009-2018 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */

/**
 * @file gsad_base.h
 * @brief Headers/structs used generally in GSA.
 */

#ifndef _GSAD_BASE_H
#define _GSAD_BASE_H

#include <glib.h>
#include <sys/time.h>

#include "gsad_cmd.h" /* for cmd_response_data_t */
#include "gsad_user.h" /* for credentials_t */

int gsad_base_init ();
int gsad_base_cleanup ();
void set_chroot_state (int);
void set_http_only (int);
char *ctime_r_strip_newline (time_t *, char *);

#endif /* not _GSAD_BASE_H */
